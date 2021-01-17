import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchMatches } from '../../Redux/matchSlice';
import styled from 'styled-components';

const StyledContainer = styled.div``;

const StyledTitle = styled.div``;

const SubTitle = styled.div``;

const List = styled.ul``;

//TODO: make only appear on positive match

export const MatchNotification = ({ movie }) => {
  const [friends, setFriends] = useState([]);

  const dispatch = useDispatch();
  const friendsList = friends.map((x) => <li key={x}>{x}</li>);

  const getMatches = async () => {
    try {
      const matchList = await dispatch(fetchMatches(movie.id));
      unwrapResult(matchList);
      console.log(matchList.payload);
      setFriends(matchList.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <StyledContainer>
      <StyledTitle>You have a match!</StyledTitle>
      <SubTitle>
        {friends.length} of your friends also liked this movie!
      </SubTitle>
      <List>{friendsList}</List>
    </StyledContainer>
  );
};
