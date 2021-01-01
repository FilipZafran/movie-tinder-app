import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';
import { LogoActive, Unlock } from '../styleElements/icons';
import { Button } from '../styleElements/buttons/Button';
import { InputField } from '../styleElements/inputField';
import { loginUser } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const authenticate = await dispatch(
        loginUser({ username: username, password: password })
      );
      unwrapResult(authenticate);
      if (authenticate.payload?.msg === 'User successfully logged in') {
        setUsername('');
        setPassword('');
        history.replace('/dashboard');
      }
      if (authenticate.payload?.err) {
        setError(authenticate.payload.msg);
      }
    } catch (err) {
      setError(err);
      if (err) console.log(err);
    }
  };

  return (
    <div className="login">
      <LogoActive size="42" />
      <h1 className="login__welcome">Filmably</h1>
      <InputField
        type="text"
        msg={{ err: true, msg: '' }}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <InputField
        placeholder="Password"
        msg={{ err: true, msg: '' }}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="login__button">
        <Link to="/requestReset">
          <Button type="button" buttonStyle="btn--stealth">
            <div className="login__unlockButton">
              <Unlock size="25" />
              <p className="login__unlockBtnLbl">Forgot password</p>
            </div>
          </Button>
        </Link>
      </div>
      <div className="login__button">
        <Button
          onClick={login}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--wide"
        >
          Login
        </Button>
        <p className="login__error">{error}</p>
      </div>
      <div className="login__button">
        <Link to="/register">
          <Button
            type="button"
            buttonStyle="btn--stealth"
            buttonSize="btn--large"
          >
            Create an account
          </Button>
        </Link>
      </div>
    </div>
  );
}
