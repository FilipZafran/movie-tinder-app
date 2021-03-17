import React from 'react';
import styled from 'styled-components';
import { Settings } from '../styleElements/icons/Settings';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/userSlice';

const Logout = styled.div`
  cursor: pointer;
  background: var(--dark-300);
  opacity: 0.5;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 80px;
  border-radius: 30px;
  margin-right: 20px;
`;

const SettingsLogo = styled.div`
  z-index: 2;
  background: var(--dark-300);
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 30px;
  margin-left: 20px;
`;

const Container = styled.div`
  padding-top: 40px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileTopNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Container>
      <SettingsLogo>
        <Link to="/dashboard/ProfileEdit">
          <Settings
            className={
              location.pathname === '/dashboard/ProfileEdit'
                ? 'activeLogo'
                : null
            }
          />
        </Link>
      </SettingsLogo>

      <Logout
        onClick={() => {
          dispatch(logoutUser());
          window.location.reload();
        }}
      >
        Logout
      </Logout>
    </Container>
  );
};
