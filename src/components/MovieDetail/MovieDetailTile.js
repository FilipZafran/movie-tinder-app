import React from 'react';
import styled from 'styled-components';
import Background from './background';

const MovieDetailTileContainer = styled.div`
  width: 360px;
  height: 300px;
  position: absolute;
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
  padding: 10px;
`;
const Crew = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  .title {
    padding-bottom: 10px;
    color: var(--dark-900);
    font-size: 18px;
  }
`;
const GeneralInfo = styled.div`
  padding: 10px;
`;
const Tile = styled.div`
  margin: 4px;
  display: inline-block;
  padding: 8px 16px;
  font-weight: 300;
  border-radius: 8px;
  background: ${(props) =>
    props.type === 'gold' ? 'var(--dark-100)' : 'var(--dark-300)'};
  color: ${(props) =>
    props.type === 'gold' ? 'var(--prime-500)' : 'var(--light-500)'};
`;
const TopLayer = styled.div`
  position: absolute;
  z-index: 5;
`;
const BackgroundLayer = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  position: absolute;
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
