import React, { useEffect } from 'react';
import './Profile.css';
import { Settings } from '../styleElements/icons/Settings';
import { Link, useLocation } from 'react-router-dom';
import { Star } from '../styleElements/icons';
import { LogoActive } from '../styleElements/icons';
import { ChevronRight } from '../styleElements/icons';
import { dummyData } from '../MatchPage/MatchCard/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import {
  logoutUser,
  selectCurrentUser,
  fetchCurrentUser,
} from '../../Redux/userSlice';
import { selectLikes } from '../../Redux/likeTrackerSlice';
import { selectActiveFilters } from '../../Redux/filtersSlice';
import Avatar from '../styleElements/avatar/Avatar.js';

export function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const likesArray = useSelector(selectLikes);
  const activeFilters = useSelector(selectActiveFilters);

  const topMatches = [];
  for (let i = 4; i < 7; i++) {
    topMatches.push(dummyData[i]);
  }

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <div className="profile__container">
      <div className="profile__header">
        <div className="profile__settings">
          <Link to="/dashboard/ProfileEdit">
            <Settings
              className={
                location.pathname === '/dashboard/ProfileEdit'
                  ? 'activeLogo'
                  : null
              }
            />
          </Link>
        </div>

        <p
          className="profile__logout"
          onClick={() => {
            dispatch(logoutUser());
            window.location.reload();
          }}
        >
          Logout
        </p>
      </div>

      <div className="profile__avatar-container">
        <Avatar />
      </div>

      {/* <div>
				<ul>{posts.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
			</div> */}

      <div className="profile__name-box">
        <h2>{currentUser.username}</h2>
        <h3>
          <LogoActive size={13} />
          &nbsp;?? matches &nbsp; &nbsp;
          <Star size={13} />
          &nbsp;{likesArray.length} likes
        </h3>

        <div className="profile__span-container">
          <span> ?? </span>
          {currentUser.city && <span> {currentUser.city} </span>}
        </div>

        <h4> Search Catagories:</h4>
        <div className="profile__span-container-big">
          {activeFilters.genreFilters.map((x) => {
            return <span key={x}>{x}</span>;
          })}
          {activeFilters.timeFilters.map((x) => {
            return <span key={x}>{x}</span>;
          })}
        </div>
      </div>

      <div id="profile__likes-container">
        <div className="profile__text-container">
          <span>Likes</span>
          <p className="profile__show-all">Show All </p>

          <Link to="/dashboard/LikedMovies">
            <ChevronRight
              size={15}
              active={
                location.pathname === '/dashboard/LikedMovies'
                  ? 'true'
                  : 'false'
              }
            />
          </Link>
        </div>

        <div className="profile__likes-container">
          {likesArray.slice(0, 3).map((entry) => (
            <img
              className="profile__likes-picture"
              src={entry.film.image}
              key={entry.film.id}
              alt="movie thumbnail"
            />
          ))}
        </div>
      </div>

      <div id="profile__matches-container">
        <div className="profile__text-container">
          <span>Top Matches</span>
          <p className="profile__show-all">Show All </p>
          <Link to="/dashboard/TopMatches">
            <ChevronRight
              size={15}
              active={
                location.pathname === '/dashboard/TopMatches' ? 'true' : 'false'
              }
            />
          </Link>
        </div>
        <div className="profile__likes-container">
          {topMatches.map((match) => (
            <img
              className="profile__likes-picture"
              src={match.image}
              key={match.id}
              alt="movie thumbnail"
            />
          ))}
        </div>
      </div>

      <div className="profile__footer">
        <Link to="/dashboard/users">
          <div
            active={location.pathname === '/users' ? 'true' : 'false'}
            className="profile__footer-text"
          >
            <h1>Friends </h1> <ChevronRight />
          </div>
        </Link>

        <hr className="profile__horizontal-line" />

        <Link to="/dashboard/chat">
          <div className="profile__footer-text">
            <h1>My Black List </h1> <ChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
}
