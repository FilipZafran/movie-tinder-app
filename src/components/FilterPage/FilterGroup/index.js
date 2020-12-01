/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  selectAllFilters,
  selectActiveFilters,
} from '../../../Redux/filtersSlice';
import { FilterChip } from '../../styleElements/buttons/FilterChip';

const StyledFilterGroup = styled.div`
  color: var(--dark-900);
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
  width: 100%;

  .filterGroup__name {
    margin-bottom: 8px;
    margin-top: 16px;
  }
`;

export const FilterGroup = ({ name, filters, clickHandler }) => {
  const activeFilters = useSelector(selectActiveFilters);
  const allFilters = useSelector(selectAllFilters);

  //compares possible filters with active filters from DB to get the current state
  const mapOver = (activeFilters, allFilters) => {
    const addKeys = (currentFilters) => {
      for (let i = 0; i < allFilters.length; i++) {
        const index = activeFilters.indexOf(allFilters[i]);
        index > -1
          ? (currentFilters[allFilters[i]] = true)
          : (currentFilters[allFilters[i]] = false);
      }
      return currentFilters;
    };
    const result = addKeys({});
    return result;
  };

  // const options = useSelector(selectAllFilters)[name].map((filter) => {
  //   const toggleActive = () => {
  //     clickHandler(filter);
  //   };
  //   return (
  //     <FilterChip
  //       clickHandler={toggleActive}
  //       filters={mapOver(activeFilters[name], allFilters[name])}
  //       filterKey={filter}
  //       key={filter}
  //     />
  //   );
  // });

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
      {options}
    </StyledFilterGroup>
  );
};
