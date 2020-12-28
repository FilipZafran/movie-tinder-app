import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { InputField } from '../styleElements/inputField';
import { LogoActive } from '../styleElements/icons';
import { Button } from '../styleElements/buttons/Button';
import styled from 'styled-components';

const StyledRegistration = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 32px;
    font-weight: 500;
    color: var(--light-100);
    margin-bottom: 21px;
    margin-top: 29px;
  }
  .error {
    height: 20px;
    font-size: 13px;
    color: var(--error-500);
    margin-bottom: 18px;
  }
  .subtitle {
    font-size: 15px;
    color: var(--light-900);
    width: 280px;
    margin-bottom: 30px;
  }
  Button {
    margin-bottom: 5px;
  }
`;

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  // func expression to post the data gathered in the inputfield
  const submit = async () => {
    try {
      const register = await dispatch(
        registerUser({
          username: username,
          password: password,
          email: email,
        })
      );
      unwrapResult(register);
      if (register.payload?.msg === 'User successfully created and logged in') {
        history.replace('/dashboard');
      }
      if (register.payload?.err) {
        setError(register.payload.msg);
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <StyledRegistration>
      <LogoActive size="42" />
      <h1>Welcome</h1>
      <p className="subtitle">
        Create an account and start directly with the movie matcher
      </p>
      <div>
        <InputField
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          msg={{ err: true, msg: '' }}
        />
        <InputField
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          msg={{ err: true, msg: '' }}
        />
        <InputField
          type="email"
          value={email}
          placeholder="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
          msg={{ err: true, msg: '' }}
        />
      </div>
      <Button
        children="Register"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--wide"
        onClick={submit}
      />
      <p className="error">{error}</p>
      <Link to="/login"> Go to Login</Link>
    </StyledRegistration>
  );
}

export default Registration;
