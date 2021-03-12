import React from 'react';
import styled from 'styled-components';
import { Settings } from '../styleElements/icons/Settings';
import { Link, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/userSlice';

const Logout = styled.div`
  position: fixed !important;
  top: 35px;
  right: 3%;
  z-index: 2;
  cursor: pointer;
  background: #202020;
  opacity: 0.5;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 80px;
  border-radius: 30px;
`;

const SettingsLogo = styled.div`
  position: fixed !important;
  top: 30px;
  left: 5%;
  z-index: 2;
  background: #202020;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 30px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: 100px;
  position: relative;
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
