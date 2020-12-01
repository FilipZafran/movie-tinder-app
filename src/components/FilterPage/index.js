/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FilterGroup } from './FilterGroup';
import { motion } from 'framer-motion';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  fetchAllFilters,
  fetchActiveFilters,
  submitActiveFilters,
} from '../../Redux/filtersSlice';
import './FilterPage.css';

export const FilterPage = ({ toggle, seeFilters, hidden }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [timeFilters, setTimeFilters] = useState({});
  const [genreFilters, setGenreFilters] = useState({});

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
      console.log(allFilters.payload);

      if (Object.keys(activeFilters.payload).length > 0) {
        console.log('here');
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
      if (location.pathname === '/dashboard/matchPage') {
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
              name="timeFilters"
              filters={timeFilters}
            />
            <FilterGroup
              clickHandler={toggleActive(genreFilters, setGenreFilters)}
              name="genreFilters"
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
