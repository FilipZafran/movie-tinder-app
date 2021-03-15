import React from 'react';
import styled from 'styled-components';
import { AvatarCircles } from './AvatarCircles';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 4;
  width: 90px;
  height: 90px;
`;
const Circles = styled.div`
  transform: scale(0.2);
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const TileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 4;
  width: 180px;
  height: 180px;
`;

const Tile = styled.div`
  transform: scale(0.7);
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const Background = styled.div`
  height: 220px;
  width: 100vw;
  border-radius: 12px;
  background-color: var(--warm-500-25);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 0;
`;

const Initials = styled.div`
  display: absolute;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 35px;
`;

const Avatar = ({ initials, circle, tile }) => {
  if (circle) {
    return (
      <Container>
        <Circles>
          <AvatarCircles />
        </Circles>
        <Initials>{initials}</Initials>
      </Container>
    );
  } else if (tile) {
    return (
      <TileContainer>
        <Tile>
          <AvatarCircles />
        </Tile>
        <Initials>{initials}</Initials>
      </TileContainer>
    );
  } else {
    return (
      <Background>
        <div>
          <AvatarCircles />
        </div>
        <Initials>{initials}</Initials>
      </Background>
    );
  }
};

export default Avatar;
