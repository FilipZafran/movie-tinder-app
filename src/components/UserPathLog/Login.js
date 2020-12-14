import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import Registration from '../UserPathLog/Register';
// import Resetpw from '../UserPathLog/Resetpw';
import './Login.css';
import { Logo } from '../styleElements/icons/Logo';
import { Button } from '../styleElements/buttons/Button';

import { loginUser } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  //this verification route will work if you run the server from index.js on your local machine
  //currently the credentials username:Admin password:password will work
  //a registration route is set up under POST "http://localhost:5000/authentication/register" (also accepts username and pw)
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
    } catch (err) {
      if (err) console.log(err);
    }
  };

  // const hide = () => {
  // 	if (!'http://localhost:3000/') {
  // 		console.log("url changed")

  // 	}
  // }

  return (
    <React.Fragment>
      <div className="login">
        <Logo />

        <h1>Welcome</h1>

        <input
          className="input-field"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <input
          className="input-field"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          onClick={login}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--medium"
        >
          Login
        </Button>
      </div>
      <div className="links-container">
        <Link to="/register">
          <Button
            type="button"
            buttonStyle="btn--stealth"
            buttonSize="btn--medium"
          >
            Create an account
          </Button>
        </Link>
        <Link to="/register">Register</Link>
        <Link to="/resetpw"> Reset PW</Link>
      </div>
    </React.Fragment>
  );
}
