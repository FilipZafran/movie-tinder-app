import React from 'react';
import Avatar from '../avatar/Avatar';
import styled from 'styled-components';

const StyledUserEntry = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--dark-300);
  margin-left: 10px;
  padding: 2px;
  .userEntry__data {
    padding-left: 10px;
  }
  .avatarInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .userEntry__icon {
    padding: 20px;
    cursor: pointer;
  }
`;

export const UserEntry = ({ icon, clickHandler, user }) => {
  const color = user.color ? user.color : 'warm';
  const initials = user.username
    .toUpperCase()
    .split(' ')
    .map((x) => x[0])
    .join('');
  return (
    <StyledUserEntry>
      <div className="avatarInfo">
        <Avatar circle initials={initials} color={color} />
        <div className="userEntry__data">{user.username}</div>
      </div>
      <div className="userEntry__icon" onClick={() => clickHandler()}>
        {icon}
      </div>
    </StyledUserEntry>
  );
};
