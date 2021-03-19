import React, { useState } from 'react';
import { Formik } from 'formik';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import { TopNav } from '../TopNav';
import { FooterToggles } from './FooterToggles';
import { FilterForm } from './FilterForm';
import Avatar from '../styleElements/avatar/Avatar.js';
import { Save } from '../styleElements/icons';
import FileUploader from './FileUploader';
import { FilterPage } from '../FilterPage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/userSlice';
import { selectActiveFilters } from '../../Redux/filtersSlice';
import { selectCurrentUser } from '../../Redux/userSlice';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 1250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;
const UploadIcon = styled.div`
  position: absolute;
`;

const FormDiv = styled.div`
  margin: 20px 0px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: var(--dark-900-25);
  border-radius: 10px;
  input {
    background: transparent;
    border: none;
    width: 260px;
    height: 40px;
    font-size: 18px;
    text-align: left;
  }
`;

const FormSelect = styled.div`
  background: var(--dark-900-25);
  border: none;
  border-radius: 10px;
  width: 300px;
  select {
    background: transparent;
    border: none;
    border-radius: 10px;
    width: 260px;
    height: 40px;
    font-size: 18px;
    color: var(--light-500);
  }
`;

const SaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-100);
  height: 60px;
  border-radius: 10px;
  width: 300px;
  size: 16px;
  color: var(--dark-900);
  margin: 30px 0px;
  div {
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 18px;
    font-weight: 500;
    width: 90vw;
    text-align: left;
    padding: 30px 0px;
  }
`;

export function ProfileEdit() {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const currentUser = useSelector(selectCurrentUser);
  const color = currentUser.color ? currentUser.color : 'warm';

  // const classes = useStyles();
  const [displayFilters, setDisplayFilters] = useState(false);

  // FileUploader > ProfileEdit
  const [setPicture] = useState('');

  // callback function
  function setPictureCallback(url) {
    setPicture(url);
  }

  return (
    <Container>
      <CirclesBackground />

      <FilterPage
        seeFilters={displayFilters}
        toggle={() => setDisplayFilters(!displayFilters)}
        hidden={!displayFilters}
      />

      <TopNav title="Profile settings" backIcon text=" " />

      <FormContainer>
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
              <AvatarContainer>
                <Avatar tile color={color} />
                <UploadIcon>
                  <FileUploader picture={setPictureCallback} />
                </UploadIcon>
              </AvatarContainer>

              <FormDiv>
                <input
                  placeholder="User name"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </FormDiv>
              <FormSelect>
                <select
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                >
                  <option value="">no answer</option>
                  <option value="NewB">Younger than 18yo</option>
                  <option value="Generation Z">Between 22 - 30yo</option>
                  <option value="Midlife Crisis">Between 30 - 40yo</option>
                  <option value="Golden Age">Between 40 - 50yo</option>
                  <option value="Veteran">Over 50yo</option>
                </select>
              </FormSelect>

              <FormDiv>
                <input
                  placeholder="City"
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
              </FormDiv>

              <FormDiv>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </FormDiv>

              <FormDiv>
                <input
                  type="password"
                  name="password"
                  placeholder="NOT FUNCTIONAL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </FormDiv>

              <SaveButton type="submit" disabled={isSubmitting}>
                <div>
                  <Save />
                  Save settings
                </div>
              </SaveButton>
            </form>
          )}
        </Formik>
      </FormContainer>
      <FilterForm
        activeFilters={activeFilters}
        clickHandler={() => setDisplayFilters(!displayFilters)}
      />
      <Footer>
        <h2>What should be publicly visible?</h2>
        <FooterToggles text="Show likes on profile page" />
        <FooterToggles text="Show matches on profile page" />
      </Footer>
    </Container>
  );
}
