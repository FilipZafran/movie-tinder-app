import React from 'react';
import styled from 'styled-components';
import { Toggle } from '../styleElements/controls/Toggle';

export const FooterToggles = ({ text }) => {
  return (
    <FooterEntry>
      <EntryInfo>
        <p>{text}</p>
        <Toggle />
      </EntryInfo>
      <Spacer></Spacer>
    </FooterEntry>
  );
};

const FooterEntry = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EntryInfo = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  font-size: 16px;
`;

const Spacer = styled.div`
  width: 100vw;
  background: var(--dark-300);
  height: 1px;
`;
