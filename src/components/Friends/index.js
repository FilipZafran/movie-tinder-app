import React from 'react';
import { TopNav } from '../TopNav';
import { SearchFriends } from './SearchFriends';
import styled from 'styled-components';

const StyledFriends = styled.div`
  width: 100vw;
  padding-top: 133px;
`;

export const Friends = () => {
  return (
    <StyledFriends>
      <TopNav bellIcon backIcon title="Friends" />
      <SearchFriends />
    </StyledFriends>
  );
};
