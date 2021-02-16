/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FilterChip } from '../../styleElements/buttons/FilterChip';

const StyledFilterGroup = styled.div`
  color: var(--dark-900);
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  width: 100%;
  margin-bottom: 16px;

  .filterGroup__name {
    margin-bottom: 8px;
  }
`;

export const FilterGroup = ({ name, filters, clickHandler }) => {
  const keys = Object.keys(filters);

  const options = keys.map((key) => {
    const toggleActive = () => {
      clickHandler(key);
    };
    return (
      <FilterChip
        clickHandler={toggleActive}
        filters={filters}
        filterKey={key}
        key={key}
      />
    );
  });

  return (
    <StyledFilterGroup>
      <div className="filterGroup__name">{name}</div>
      <FilterChip
        clickHandler={() => clickHandler(name)}
        filters={filters}
        filterKey={name === 'Time' ? 'All time' : 'All genres'}
      />
      {options}
    </StyledFilterGroup>
  );
};
