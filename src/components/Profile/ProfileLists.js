import React from 'react';
import './Profile.css';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from '../styleElements/icons';
import { dummyData } from '../MatchPage/MatchCard/dummyData';

export const ProfileLists = ({ filmArray, listTitle }) => {
  const location = useLocation();
  const topMatches = [];
  for (let i = 4; i < 7; i++) {
    topMatches.push(dummyData[i]);
  }
  console.log(filmArray);
  return (
    <div id="profile__likes-container">
      <div className="profile__text-container">
        <span>{listTitle}</span>
        <p className="profile__show-all">Show All </p>

        <Link to="/dashboard/LikedMovies">
          <ChevronRight
            size={15}
            active={
              location.pathname === '/dashboard/LikedMovies' ? 'true' : 'false'
            }
          />
        </Link>
      </div>

      <div className="profile__likes-container">
        {filmArray
          .filter((x) => x.film)
          .map((entry) => {
            return (
              <img
                className="profile__likes-picture"
                src={entry.film.image}
                key={entry.film.id}
                alt="movie thumbnail"
              />
            );
          })}
      </div>
    </div>
  );
};
