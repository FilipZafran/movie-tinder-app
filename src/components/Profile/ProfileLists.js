import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from '../styleElements/icons';
import styled from 'styled-components';

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  width: 100vw;
  margin: 20px 0px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-left: 20px;
  height: 24px;
  font-size: 22px;
  font-weight: 500;
`;

const ShowAll = styled.div`
  margin-right: 20px;
  height: 24px;
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: var(--light-900);
`;

const ImageTilesList = styled.div`
  height: 150px;
  display: flex;
  justify-content: left;
  overflow: hidden;
`;

const ImageTile = styled.img`
  width: 100px;
  border-radius: 10px;
  margin: 0px 10px;
`;

export const ProfileLists = ({ filmArray, listTitle, link }) => {
  return (
    <Container>
      <Header>
        <Title>{listTitle}</Title>
        <Link to={link}>
          <ShowAll>
            Show all
            <ChevronRight size={24} />
          </ShowAll>
        </Link>
      </Header>

      <ImageTilesList>
        {filmArray
          .filter((x) => x.film)
          .slice(0, 9)
          .map((entry) => {
            return (
              <ImageTile
                className="profile__likes-picture"
                src={entry.film.image}
                key={entry.film.id}
                alt="movie thumbnail"
              />
            );
          })}
      </ImageTilesList>
    </Container>
  );
};
