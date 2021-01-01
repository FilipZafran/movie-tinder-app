import React from 'react';
import { TopNav } from '../TopNav';
import { FetchInvitations } from './FetchInvitations';
import styled from 'styled-components';

const StyledInvitations = styled.div`
  width: 100vw;
  padding-top: 133px;
`;

export const Invitations = () => {
  return (
    <StyledInvitations>
      <TopNav bellIcon backIcon title="Invitations" />
      <FetchInvitations />
    </StyledInvitations>
  );
};
