import React, { useState } from 'react';
import {
  Select,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // makeStyles,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import { TopNav } from '../TopNav';
import { Toggle } from '../styleElements/controls/Toggle';
import Avatar from '../styleElements/avatar/Avatar.js';
import { Check } from '../styleElements/icons/Check.js';
import FileUploader from './FileUploader';
import { Settings } from '../styleElements/icons/Settings';
import { FilterPage } from '../FilterPage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/userSlice';
import { selectActiveFilters } from '../../Redux/filtersSlice';
import { selectCurrentUser } from '../../Redux/userSlice';

// const useStyles = makeStyles(() => ({
//   formControl: {
//     minWidth: 100,
//   },
// }));

export function ProfileEdit() {
  const location = useLocation();
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const currentUser = useSelector(selectCurrentUser);

  // const classes = useStyles();
  const [displayFilters, setDisplayFilters] = useState(false);

  // FileUploader > ProfileEdit
  const [setPicture] = useState('');

  // callback function
  function setPictureCallback(url) {
    setPicture(url);
  }

  return (
    <div className="profile__filterPage">
      <CirclesBackground />

      <FilterPage
        seeFilters={displayFilters}
        toggle={() => setDisplayFilters(!displayFilters)}
        hidden={!displayFilters}
      />

      <Link to="/dashboard//Profile">
        <TopNav backIcon active={location.pathname === '/dashboard//Profile'} />
      </Link>

      <div className="profile__edit-containter">
        <div className="profile__edit-footer">
          <h1>Profile Settings </h1>
        </div>

        <Formik
          initialValues={{
            picture: '',
            username: currentUser.username,
            age: currentUser.age || '',
            city: currentUser.city || '',
            email: currentUser.email,
            password: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(updateUser(values));
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div id="profile__edit-picture-container">
                <Avatar className="profile__avatar" />
              </div>

              <FileUploader picture={setPictureCallback} />

              <div className="profile__edit-label-input">
                <label> Username:</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </div>
              <div className="profile__edit-label-input profile__edit__age-select-wrapper">
                <label> Age range:</label>
                <Select
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  className="profile__edit__age-select"
                >
                  <option className="profile__edit__age-option" value="">
                    no answer
                  </option>
                  <option className="profile__edit__age-option" value="NewB">
                    Younger than 18yo
                  </option>
                  <option
                    className="profile__edit__age-option"
                    value="Generation Z"
                  >
                    Between 22 - 30yo
                  </option>
                  <option
                    className="profile__edit__age-option"
                    value="Midlife Crisis"
                  >
                    Between 30 - 40yo
                  </option>
                  <option
                    className="profile__edit__age-option"
                    value="Golden Age"
                  >
                    Between 40 - 50yo
                  </option>
                  <option className="profile__edit__age-option" value="Veteran">
                    Over 50yo
                  </option>
                </Select>

                {/* <FormControl
                  className={`${classes.formControl} profile__edit__age-select`}
                  id="profile__edit-formcontrol"
                >
                  <InputLabel id="profile__edit-inputlabel">
                    Age range:
                  </InputLabel>
                  <Select id="profile__edit-select" onChange={handleChange}>
                    <MenuItem value={'Newb'}> Younger than 18yo</MenuItem>
                    <MenuItem value={'Generation Z'}>
                      Between 22 - 30yo
                    </MenuItem>
                    <MenuItem value={'Midlife Crisis'}>
                      {' '}
                      Between 30 - 40yo
                    </MenuItem>
                    <MenuItem value={'Golden Age'}>
                      {' '}
                      Between 40 - 50yo{' '}
                    </MenuItem>
                    <MenuItem value={'Veteran'}>Over 50yo </MenuItem>
                  </Select>
                </FormControl> */}
              </div>

              <div className="profile__edit-label-input">
                <label> City: </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
              </div>

              <div className="profile__edit-label-input">
                <label> Email: </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>

              <div className="profile__edit-label-input">
                <label> Password: </label>
                <input
                  type="password"
                  name="password"
                  placeholder="NOT FUNCTIONAL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </div>

              <div className="profile__edit-current-filters">
                <h4>
                  {' '}
                  Current filters: &nbsp;{' '}
                  <div onClick={() => setDisplayFilters(!displayFilters)}>
                    <Settings />
                  </div>
                </h4>

                <div className="profile__edit-span-container">
                  {activeFilters.genreFilters.map((x) => {
                    return <span key={x}>{x}</span>;
                  })}
                  {activeFilters.timeFilters.map((x) => {
                    return <span key={x}>{x}</span>;
                  })}
                </div>
              </div>

              <button
                className="profile__bttn"
                // active={location.pathname === '/dashboard/Profile'}
                type="submit"
                disabled={isSubmitting}
              >
                <Check /> &nbsp; Save
              </button>
            </form>
          )}
        </Formik>

        <div className="profile__edit-likes-friends">
          <div className="profile__edit-grid">
            <p className="profile__p-text">Show likes on profile page</p>
            <Toggle />
          </div>
          <div className="profile__edit-grid">
            <p className="profile__p-text">Show matches on profile page</p>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
}
