import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function Registration() {
  const [values, setInput] = useState('');
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  // const [values, setInput] = useState('')
  // const [error, setError] = useState();

  // func expression to post the data gathered in the inputfield
  const submit = async () => {
    try {
      const register = await dispatch(
        registerUser({
          username: values.username,
          password: values.password,
          email: values.email,
        })
      );
      unwrapResult(register);
      if (register.payload?.msg === 'User successfully created') {
        history.replace('/dashboard');
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  //will handle the fact that many letters can be written and update to the lastest version
  const handleChange = (e) => {
    //with set input, update the state of name and value together
    setInput({
      ...values,
      [e.target.name]: e.target.value,
    });
    return [values, handleChange];
  };

  return (
    <React.Fragment>
      <div>
        {error && <div>Something went wrong!</div>}
        <input
          type="text"
          name="username"
          placeholder="username"
          onInput={(e) => setInput(e.target.value)}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onInput={(e) => setInput(e.target.value)}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="e-mail"
          onInput={(e) => setInput(e.target.value)}
          onChange={handleChange}
        />
        <button onClick={submit}> Register </button>
        <Link to="/login"> Log In</Link>
        <Link to="/resetpw">Reset PW</Link>
      </div>
    </React.Fragment>
  );
}

export default Registration;
