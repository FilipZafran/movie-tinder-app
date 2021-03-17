import React from 'react';
import styled from 'styled-components';
import { Settings } from '../styleElements/icons/Settings';

export const FilterForm = ({ activeFilters, clickHandler }) => {
  return (
    <Container>
      <Header>
        Current filters
        <SettingsIcon onClick={clickHandler}>
          <Settings />
        </SettingsIcon>
      </Header>

      <Filters>
        {activeFilters.genreFilters.map((x) => {
          return <Tile key={x}>{x}</Tile>;
        })}
        {activeFilters.timeFilters.map((x) => {
          return <Tile key={x}>{x}</Tile>;
        })}
      </Filters>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  background-color: var(--dark-900-25);
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  font-size: 20px;
  width: 260px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SettingsIcon = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: var(--dark-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Filters = styled.div`
  display: inline-block;
  width: 100%;
`;

const Tile = styled.div`
  background: var(--dark-300);
  white-space: nowrap;
  padding: 8px 16px;
  display: inline-block;
  border-radius: 8px;
  margin: 4px;
`;
