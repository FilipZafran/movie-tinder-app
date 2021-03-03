/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { preloadRemoveOne } from '../../../../Redux/moviesSlice';

const StyledSkipButton = styled.div`
  cursor: ${(props) => !props.inactive && 'pointer'};
  padding: 5px 10px;
  font-size: 14px;
  color: ${(props) => props.inactive && 'var(--light-900)'};
`;

export const SkipButton = ({ inactive }) => {
  const dispatch = useDispatch();
  return (
    <StyledSkipButton
      onClick={() => {
        dispatch(preloadRemoveOne());
      }}
      inactive={inactive}
    >
      Skip
    </StyledSkipButton>
  );
};
