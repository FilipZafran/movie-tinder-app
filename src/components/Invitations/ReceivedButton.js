import React from 'react';
import styled from 'styled-components';

const StyledReceivedButton = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  margin: 8px;
  border-radius: 8px;
  background: ${(props) =>
    (props.state === 'true' && props.type === 'Received') ||
    (props.state === 'false' && props.type === 'Sent')
      ? 'var(--light-100)'
      : 'var(--dark-100)'};
  color: ${(props) =>
    (props.state === 'true' && props.type === 'Received') ||
    (props.state === 'false' && props.type === 'Sent')
      ? 'var(--dark-900)'
      : 'var(--light-700)'};
`;

export const ReceivedButton = ({ label, state, clickHandler }) => {
  return (
    <StyledReceivedButton
      state={state.toString()}
      onClick={() => clickHandler()}
      type={label}
    >
      {label}
    </StyledReceivedButton>
  );
};
