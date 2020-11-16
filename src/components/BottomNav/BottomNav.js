import React from 'react';
import { Thunder, Heart, Star } from '../styleElements/icons';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';
import { Ripple } from './RippleButton';

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="bottomNav">
      <Link to="/profile">
        <Ripple classes="bottomNavButton">
          <Star active={location.pathname === '/profile' ? true : false} />
          <p
            className={
              location.pathname === '/profile'
                ? 'bottomNav__activeLabel'
                : 'bottomNav__label'
            }
          >
            My Lists
          </p>
        </Ripple>
      </Link>
      <Link to="/MatchPage">
        <Ripple classes="bottomNavButton">
          <Thunder active={location.pathname === '/matchPage' ? true : false} />
          <p
            className={
              location.pathname === '/matchPage'
                ? 'bottomNav__activeLabel'
                : 'bottomNav__label'
            }
          >
            Shots
          </p>
        </Ripple>
      </Link>
      <Link to="/friends">
        <Ripple classes="bottomNavButton">
          <Heart active={location.pathname === '/friends' ? true : false} />
          <p
            className={
              location.pathname === '/friends'
                ? 'bottomNav__activeLabel'
                : 'bottomNav__label'
            }
          >
            Friends
          </p>
        </Ripple>
      </Link>
    </div>
  );
}
