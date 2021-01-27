import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchMatches } from '../../Redux/matchSlice';
import { selectAllFriends } from '../../Redux/friendsSlice';
import { selectCurrent } from '../../Redux/moviesSlice';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 10;
  background: var(--dark-900);
  width: 200px;
  height: 350px;
  border-radius: 10px;
  padding: 20px;
`;
const Close = styled.div`
  position: relative;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid var(--dark-300);
  border-radius: 5px;
  padding: 10px;
  :hover {
    border: 1px solid var(--light-300);
  }
`;

const StyledTitle = styled.div`
  font-size: 30px;
  margin: 20px 0px;
  color: var(--light-100);
`;

const SubTitle = styled.div`
  span {
    font-weight: 500;
    color: var(--prime-900);
  }
  .title {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const List = styled.ul`
  margin-top: 20px;
  height: 160px;
`;

//TODO: make only appear on positive match

export const MatchNotification = ({ decision }) => {
  const [friends, setFriends] = useState({ movie: { title: '' }, matches: [] });
  const [display, setDisplay] = useState('false');
  const allFriends = useSelector(selectAllFriends);
  const currentMovie = useSelector(selectCurrent);

  const dispatch = useDispatch();
  const friendsList = friends
    ? friends.matches.map((x) => <li key={x.id}>{x.username}</li>)
    : null;

  const getMatches = async () => {
    try {
      const matchList = await dispatch(
        fetchMatches({ film: currentMovie, allFriends: allFriends })
      );
      unwrapResult(matchList);
      setFriends(matchList.payload);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDisplay = () => {
    setDisplay('false');
  };

  useEffect(() => {
    if (decision === 'like') {
      getMatches();
    }
  }, [decision]);

  useEffect(() => {
    if (friends && friends.matches.length > 0) {
      setDisplay('true');
    }
  }, [friends]);

  return (
    <StyledContainer display={display}>
      <StyledTitle>You have a match!</StyledTitle>
      <SubTitle>
        <span>{friends ? friends.matches.length : 'None'}</span> of your friends
        also liked
        <div className="title">{friends ? friends.movie.title : ''}</div>
      </SubTitle>
      <List>{friendsList}</List>
      <Close onClick={toggleDisplay}>CLOSE</Close>
    </StyledContainer>
  );
};
