import React from 'react';
import styled from 'styled-components';

import { Star } from '../styleElements/icons';
import { LogoActive } from '../styleElements/icons';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Redux/userSlice';
import { selectLikes } from '../../Redux/likeTrackerSlice';
import { selectActiveFilters } from '../../Redux/filtersSlice';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 80px;
`;

const StyledProfileTile = styled.div`
  background-color: var(--dark-500);
  width: 235px;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
`;

const LikesAndMatches = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 4px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 4px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
`;

const TopGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  width: 235px;
  flex-wrap: wrap;
`;

const FilterHeader = styled.div`
  font-size: 14px;
  margin: 20px 0px 5px 0px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
`;

const Tile = styled.div`
  font-size: 14px;
  padding: 8px 16px;
  background: var(--dark-300);
  color: var(--light-500);
  border-radius: 8px;
  margin: 4px 2px;
`;

export const ProfileTile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const likesArray = useSelector(selectLikes);
  const activeFilters = useSelector(selectActiveFilters);

  return (
    <Container>
      <StyledProfileTile>
        <Title>{currentUser.username}</Title>
        <LikesAndMatches>
          <div>
            <LogoActive size={24} />
            <p>?? matches</p>
          </div>
          <div>
            <Star size={24} active />
            <p>{likesArray.length} likes</p>
          </div>
        </LikesAndMatches>

        <TopGroup>
          {currentUser.age && <Tile> {currentUser.age} </Tile>}
          {currentUser.city && <Tile> {currentUser.city} </Tile>}
        </TopGroup>

        <FilterHeader>Current Catagories</FilterHeader>
        <FilterGroup>
          {activeFilters.genreFilters.map((x) => {
            return <Tile key={x}>{x}</Tile>;
          })}
          {activeFilters.timeFilters.map((x) => {
            return <Tile key={x}>{x}</Tile>;
          })}
        </FilterGroup>
      </StyledProfileTile>
    </Container>
  );
};
