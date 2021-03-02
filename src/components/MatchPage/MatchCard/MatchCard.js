import React, { useState, useEffect } from 'react';
import { Flip } from '../../styleElements/icons';
import './MatchCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, addDislike } from '../../../Redux/likeTrackerSlice';
import {
  selectCurrent,
  selectPreload,
  preloadAdded,
  preloadRemoveOne,
  selectToSwipe,
} from '../../../Redux/moviesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { CirclesBg } from '../../styleElements/icons';

export const MatchCard = ({ decision, reset }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();

  const toSwipe = useSelector(selectToSwipe);
  const preLoadArray = useSelector(selectPreload);
  const currentFilm = useSelector(selectCurrent);

  //show movie info or show movie poster (default is show poster)
  const toggleInfo = () => setShowInfo(!showInfo);

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
    if (isMounted && preLoadArray.length < 5 && toSwipe.length > 0) {
      dispatch(preloadAdded());
    } else {
      setIsMounted(true);
    }
  }, [preLoadArray]);

  //when a decision is made it triggers an axios call

  useEffect(() => {
    if (decision === 'like') {
      const updateLikes = async () => {
        try {
          const newLike = await dispatch(addLike(preLoadArray[0]));
          unwrapResult(newLike);
          if (localStorage.getItem('isAuthenticated') !== 'true') {
            window.location.reload(false);
          }
          console.log(newLike.payload);
        } catch (err) {
          return err;
        }
      };
      updateLikes();
      if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.reload(false);
      } else {
        dispatch(preloadRemoveOne());
        setShowInfo(false);
        reset();
      }
    }
    if (decision === 'dislike') {
      const updateDislikes = async () => {
        try {
          const newDislike = await dispatch(addDislike(preLoadArray[0]));
          unwrapResult(newDislike);
          if (localStorage.getItem('isAuthenticated') !== 'true') {
            window.location.reload(false);
          }
          console.log(newDislike.payload);
        } catch (err) {
          return err;
        }
      };
      updateDislikes();
      if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.reload(false);
      } else {
        dispatch(preloadRemoveOne());
        setShowInfo(false);
        reset();
      }
    }
  }, [decision]);

  if (currentFilm['title']) {
    return (
      <div className="matchCard">
        <div
          className="matchCard__current"
          style={
            showInfo
              ? null
              : { backgroundImage: `url(${currentFilm['image']})` }
          }
        >
          <div className="matchCard__button" onClick={toggleInfo}>
            <Flip className="light300" />
          </div>
          <div
            className="matchCard__info"
            style={showInfo ? null : { display: 'none' }}
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
  } else {
    return (
      <div className="matchCard">
        <div className="matchCard__empty">
          <div className="matchCard__emptyBg">
            <CirclesBg color="grey" size="middle" />
          </div>
          <div className="matchCard__emptyText">
            Select more catagories to keep going!!
          </div>
        </div>
        <div className="matchCard__bg1"></div>
        <div className="matchCard__bg2"></div>
      </div>
    );
  }
};
