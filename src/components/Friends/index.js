import React from 'react';
import { TopNav } from '../TopNav';
import { SearchFriends } from './SearchFriends';
import styled from 'styled-components';

const StyledFriends = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-top: 133px;
`;

export const Friends = () => {
  return (
    <StyledFriends>
      <TopNav text=" " backIcon title="Friends" />
      <SearchFriends />
    </StyledFriends>
  );
};
