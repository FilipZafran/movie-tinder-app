import React from 'react';
import { ChevronLeft, Filter, Bell } from '../styleElements/icons';
import { Link, useHistory } from 'react-router-dom';
import './TopNav.css';

export const TopNav = ({
  backIcon,
  filterIcon,
  text,
  textLink,
  dark,
  displayFilters,
  bellIcon,
  title,
}) => {
  const history = useHistory();

  const clickHandler = () => {
    history.goBack();
  };

  return (
    <div className="topNav">
      {backIcon ? (
        <div
          onClick={clickHandler}
          className="topNav__button"
          id={dark ? 'topNav__buttonDark' : null}
        >
          <ChevronLeft className="light300" />
        </div>
      ) : (
        <div className="topNav__none"> </div>
      )}
      <div className="topNav_title">{title}</div>
      {filterIcon ? (
        <div onClick={displayFilters} className="topNav__button">
          <Filter className="light300" />
        </div>
      ) : bellIcon ? (
        <Link to={'/dashboard/invitations'}>
          <div className="topNav__button">
            <Bell size="24" />
          </div>
        </Link>
      ) : text && textLink ? (
        <Link to={textLink}>
          <div className="topNav__text">{text}</div>
        </Link>
      ) : text === ' ' ? (
        <div className="topNav__none">{text}</div>
      ) : (
        <div className="topNav__text">{text}</div>
      )}
    </div>
  );
};
