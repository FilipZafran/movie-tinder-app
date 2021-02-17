import React, { useState, useEffect } from 'react';
import { FilterGroup } from './FilterGroup';
import { motion } from 'framer-motion';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  fetchAllFilters,
  fetchActiveFilters,
  submitActiveFilters,
} from '../../Redux/filtersSlice';
import './FilterPage.css';
import { fetchToSwipe } from '../../Redux/moviesSlice';

export const FilterPage = ({ toggle, seeFilters, hidden }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [timeFilters, setTimeFilters] = useState({});
  const [genreFilters, setGenreFilters] = useState({});

  //handel the 'All time' and 'All genres' buttons
  const [allTime, setAllTime] = useState(true);
  const [allGenres, setAllGenres] = useState(true);

  //toggles the filters from active to inactive in the state
  const toggleActive = (getter, setter) => (filter) =>
    setter({ ...getter, [filter]: !getter[filter] });

  //compares possible filters with active filters from DB to get the current state
  const mapOver = (activeFilters, possibleFilters) => {
    const addKeys = (currentFilters) => {
      for (let i = 0; i < possibleFilters.length; i++) {
        const index = activeFilters.indexOf(possibleFilters[i]);
        index > -1
          ? (currentFilters[possibleFilters[i]] = true)
          : (currentFilters[possibleFilters[i]] = false);
      }
      return currentFilters;
    };
    const result = addKeys({});
    return result;
  };

  //gets the current filters and converts them into an object in the state
  const getFilters = async () => {
    try {
      const allFilters = await dispatch(fetchAllFilters());
      const activeFilters = await dispatch(fetchActiveFilters());
      unwrapResult(allFilters);
      unwrapResult(activeFilters);
      if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.reload(false);
      }
      if (Object.keys(activeFilters.payload).length > 0) {
        setGenreFilters(
          mapOver(
            activeFilters.payload.genreFilters,
            allFilters.payload.genreFilters
          )
        );
        setTimeFilters(
          mapOver(
            activeFilters.payload.timeFilters,
            allFilters.payload.timeFilters
          )
        );
      } else {
        setGenreFilters(mapOver([], allFilters.payload.genreFilters));
        setTimeFilters(mapOver([], allFilters.payload.timeFilters));
      }
    } catch (err) {
      return err;
    }
  };

  //takes the current state and makes an array of active filters
  const reverseMapOver = (filterObject) => {
    let filterArray = [];
    for (let [key, value] of Object.entries(filterObject)) {
      if (value) filterArray.push(key);
    }
    return filterArray;
  };

  //converts state filter objects into two strings and saves them in the DB
  const clickOkay = async () => {
    try {
      const newFilters = await dispatch(
        submitActiveFilters({
          genreFilters: reverseMapOver(genreFilters),
          timeFilters: reverseMapOver(timeFilters),
        })
      );
      unwrapResult(newFilters);
      if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.reload(false);
      }
      dispatch(fetchToSwipe());
      if (
        location.pathname === '/dashboard/matchPage' ||
        location.pathname === '/dashboard/ProfileEdit'
      ) {
        toggle();
      } else {
        history.push('/dashboard/matchPage');
      }
      return newFilters.payload;
    } catch (err) {
      return err;
    }
  };

  const clickCancel = () => {
    getFilters();
    toggle();
  };

  useEffect(() => {
    getFilters();
  }, []);

  // if no timeFilter/genreFilters are selected
  // automatically selects "all Time" or "all genres"
  useEffect(() => {
    [...new Set(Object.values(timeFilters))].length < 2 &&
    !Object.values(timeFilters)[0]
      ? setAllTime(true)
      : setAllTime(false);
    [...new Set(Object.values(genreFilters))].length === 1 &&
    !Object.values(genreFilters)[0]
      ? setAllGenres(true)
      : setAllGenres(false);
  }, [timeFilters, genreFilters]);

  //if 'all Time' or 'all Genres' is selected any active timeFilter and/or genreFilter
  //is automatically deselected
  useEffect(() => {
    if (allTime) {
      setTimeFilters(mapOver([], Object.keys(timeFilters)));
    }
    if (allGenres) {
      setGenreFilters(mapOver([], Object.keys(genreFilters)));
    }
  }, [allTime, allGenres]);

  return (
    <div
      className={
        hidden ? 'filterPage__hidden' : seeFilters ? 'filterPage' : 'letsStart'
      }
      onClick={seeFilters ? null : toggle}
    >
      <motion.div layout data-isopen={seeFilters} className="letsStart__border">
        <motion.div layout data-isopen={seeFilters} className="letsStart__card">
          <motion.div layout className="letsStart__title">
            {/* eslint-disable-next-line react/no-unescaped-entities*/}
            Let's Start
          </motion.div>
          <motion.div layout className="letsStart__content">
            <FilterGroup
              clickHandler={toggleActive(timeFilters, setTimeFilters)}
              all={allTime}
              toggleAll={() => setAllTime(!allTime)}
              name="Time"
              filters={timeFilters}
            />
            <FilterGroup
              clickHandler={toggleActive(genreFilters, setGenreFilters)}
              all={allGenres}
              toggleAll={() => setAllGenres(!allGenres)}
              name="Genre"
              filters={genreFilters}
            />
          </motion.div>
          <motion.div layout className="filterPage__buttons">
            <div onClick={clickCancel} className="filterPage__cancel">
              Cancel
            </div>
            <div onClick={clickOkay} className="filterPage__ok">
              OK
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
