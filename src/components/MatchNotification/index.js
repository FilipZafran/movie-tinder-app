import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchMatches } from '../../Redux/matchSlice';
import { selectAllFriends } from '../../Redux/friendsSlice';
import { selectCurrent } from '../../Redux/moviesSlice';
import { CirclesBg } from '../styleElements/icons/CirclesBg';
import styled from 'styled-components';

const StyledContainer = styled.div`
  z-index: -2;
  display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 200px;
  height: 160px;
  border-radius: 20px;
  padding: 10px;
  background: var(--prime-500-25);
`;

const StyledContent = styled.div`
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  padding: 20px;
  display: flex;
  width: 200px;
  height: 120px;
  flex-direction: column;
  align-items: center;
`;

const Close = styled.div`
  position: relative;
  width: 60px;
  font-size: 14px;
  background: var(--dark-100);
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;
  margin: 5px;
`;

const StyledTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 15px 0px 10px 0px;
  color: var(--dark-900);
`;

const CirclesBackground = styled.div`
  z-index: -1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 120px;
`;

const Matches = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const SeeMore = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid var(--dark-900);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserIconList = styled.ul`
  height: 20px;
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
      <StyledContent>
        <CirclesBackground>
          <CirclesBg color="gold" />
        </CirclesBackground>
        <StyledTitle>It matched!</StyledTitle>
        <Matches>
          <UserIconList>{friendsList}</UserIconList>
          <SeeMore></SeeMore>
        </Matches>
        <Close onClick={toggleDisplay}>Close</Close>
      </StyledContent>
    </StyledContainer>
  );
};
