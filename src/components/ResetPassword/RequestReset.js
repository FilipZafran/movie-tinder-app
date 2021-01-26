import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestReset } from '../../Redux/resetSlice';
import { Button } from '../styleElements/buttons/Button';
import { Link } from 'react-router-dom';
import { InputField } from '../styleElements/inputField';
import styled from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';
import { LogoActive } from '../styleElements/icons';

const StyledRequestReset = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 32px;
    font-weight: 500;
    color: var(--light-300);
    margin-bottom: 21px;
    margin-top: 29px;
  }
  .subtitle {
    font-size: 15px;
    color: var(--light-900);
    width: 280px;
    margin-bottom: 30px;
  }
  Button {
    margin-bottom: 20px;
  }
`;

export const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const msg = await dispatch(requestReset(email));
    unwrapResult(msg);
    setMessage(msg.payload);
    setEmail('');
  };

  return (
    <StyledRequestReset>
      <LogoActive size="42" />
      <h1>Account Recovery</h1>
      <p className="subtitle">request an email to reset you password</p>

      <InputField
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-Mail"
        msg={message}
      ></InputField>
      <Button
        buttonStyle="btn--primary--solid"
        buttonSize="btn--wide"
        onClick={onSubmit}
      >
        Send E-mail
      </Button>
      <Link to="/login">
        <Button type="button" buttonStyle="btn--stealth">
          Go to Login
        </Button>
      </Link>
    </StyledRequestReset>
  );
};
