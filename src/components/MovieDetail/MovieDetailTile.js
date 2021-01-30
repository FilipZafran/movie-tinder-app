import React from 'react';
import styled from 'styled-components';
import Background from './background';

const MovieDetailTileContainer = styled.div`
  width: 360px;
  height: 240px;
  /* width: 100px;
  height: 100px; */
  /* background: green; */
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Title = styled.div`
  color: var(--dark-900);
  font-size: 24px;
  font-weight: 500;
`;
const Crew = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    color: var(--dark-900);
    font-size: 18px;
  }
`;
const GeneralInfo = styled.div``;
const Tile = styled.div`
  margin: 4px;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${(props) =>
    props.type === 'gold' ? 'var(--dark-100)' : 'var(--dark-300)'};
  color: ${(props) =>
    props.type === 'gold' ? 'var(--prime-500)' : 'var(--light-500)'};
`;
const TopLayer = styled.div`
  position: relative;
  z-index: 5;
`;
const BackgroundLayer = styled.div`
  position: relative;
  z-index: 0;
`;

export const MovieDetailTile = ({ movie }) => {
  const crewList = movie.crew.split(', ').map((x) => <Tile key={x}>{x}</Tile>);

  return (
    <MovieDetailTileContainer>
      <BackgroundLayer>
        <Background />
      </BackgroundLayer>
      <TopLayer>
        <Title>{movie.title}</Title>
        <GeneralInfo>
          <Tile type="gold">Release: {movie.year}</Tile>
          <Tile type="gold">ImDb rating: {movie.imDbRating}</Tile>
        </GeneralInfo>
        <Crew>
          <div className="title">Crew</div>
          <div>{crewList}</div>
        </Crew>
      </TopLayer>
    </MovieDetailTileContainer>
  );
};
