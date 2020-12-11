import React, { useState, useEffect, useRef } from 'react';
import { Flip } from '../../styleElements/icons';
import './MatchCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, addDislike } from '../../../Redux/likeTrackerSlice';
import {
  selectCurrent,
  selectPreload,
  preloadAdded,
  preloadRemoveOne,
} from '../../../Redux/moviesSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export const MatchCard = ({ decision, reset }) => {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  const preLoadArray = useSelector(selectPreload);
  const currentFilm = useSelector(selectCurrent);

  //show movie info or show movie poster (default is show poster)
  const toggleInfo = () => setShowInfo(!showInfo);

  //isMounted makes sure that the setCurrentFilm only runs after
  //the filmArray has loaded (and not on mount)
  const isMounted = useRef(false);

  //maps over crew and makes a div for every crew member

  const crewMembers = (currentFilm['crew']
    ? currentFilm['crew']
    : currentFilm['description']
    ? currentFilm['description']
    : ''
  )
    .replace('dir.', 'director')
    .split(', ')
    .map((member) => (
      <div className="matchCard__bubble" key={member}>
        {member}
      </div>
    ));

  useEffect(() => {
    if (isMounted.current && preLoadArray.length < 5) {
      dispatch(preloadAdded());
    } else {
      isMounted.current = true;
    }
  }, [preLoadArray]);

  //when a decision is made it triggers an axios call

  const serverURL = process.env.REACT_APP_SERVER;

  useEffect(() => {
    if (decision === 'like') {
      const updateLikes = async () => {
        try {
          const newLike = await dispatch(addLike(preLoadArray[0]));
          unwrapResult(newLike);
          console.log(newLike.payload);
        } catch (err) {
          return err;
        }
      };
      updateLikes();
      dispatch(preloadRemoveOne());
      setShowInfo(false);
      reset();
    }
    if (decision === 'dislike') {
      const updateDislikes = async () => {
        try {
          const newDislike = await dispatch(addDislike(preLoadArray[0]));
          unwrapResult(newDislike);
          console.log(newDislike.payload);
        } catch (err) {
          return err;
        }
      };
      updateDislikes();
      dispatch(preloadRemoveOne());
      setShowInfo(false);
      reset();
    }
  }, [decision, reset, preLoadArray, serverURL, dispatch]);

  return (
    <div className="matchCard">
      <div
        className="matchCard__current"
        style={
          showInfo ? null : { backgroundImage: `url(${currentFilm['image']})` }
        }
      >
        <div className="matchCard__button" onClick={toggleInfo}>
          <Flip className="light300" />
        </div>
        <div
          className="matchCard__info"
          style={showInfo ? null : { display: `none` }}
        >
          <div className="matchCard__title">{currentFilm['title']}</div>
          <div className="matchCard__details">
            <div>
              <div className="matchCard__bubble">
                Release: {currentFilm['year']}
              </div>
              <div className="matchCard__bubble">
                ImDb rating: {currentFilm['imDbRating']}
              </div>
            </div>
            <p>Crew</p>
            <div>{crewMembers}</div>
          </div>
        </div>
      </div>
      <div className="matchCard__bg1"></div>
      <div className="matchCard__bg2"></div>
    </div>
  );
};
