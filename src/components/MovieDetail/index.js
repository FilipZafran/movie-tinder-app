import React from 'react';
import styled from 'styled-components';
import { TopNav } from '../TopNav';
import { MovieDetailTile } from './MovieDetailTile';

const dummyData = {
  id: 'tt0468569',
  rank: '4',
  title: 'The Dark Knight',
  fullTitle: 'The Dark Knight (2008)',
  year: '2008',
  image:
    'https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg',
  crew: 'Christopher Nolan (dir.), Christian Bale, Heath Ledger',
  imDbRating: '9.0',
  imDbRatingCount: '2269138',
};

const MovieDetailContainer = styled.div``;

export const MovieDetail = () => {
  return (
    <MovieDetailContainer>
      <TopNav backIcon />
      <MovieDetailTile movie={dummyData} />
    </MovieDetailContainer>
  );
};
