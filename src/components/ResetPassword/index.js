import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogoActive } from '../styleElements/icons';
import { useParams } from 'react-router';
import { resetPassword } from '../../Redux/resetSlice';
import { Button } from '../styleElements/buttons/Button';
import { InputField } from '../styleElements/inputField';
import { useDispatch } from 'react-redux';
import { TopNav } from '../TopNav';
import styled from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';

const StyledResetPassword = styled.div`
  height: 85vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 32px;
    font-weight: 500;
    color: var(--light-300);
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .inputErr {
    margin-top: 5px;
    color: var(--error-500);
    height: 20px;
  }
  .inputMsg {
    margin-top: 5px;
    color: var(--light-100);
    height: 20px;
  }
  Button {
    margin-top: 15px;
  }
`;

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchMessage, setMatchMessage] = useState('');
  const [resMsg, setResMsg] = useState({ err: true, msg: '' });
  const dispatch = useDispatch();
  const { token } = useParams();

  const submitHandler = async (e) => {
    if (password === '' || password !== confirmPassword) {
      setResMsg({ err: true, msg: 'invalid password' });
    } else {
      const msg = await dispatch(
        resetPassword({ password: password, token: token })
      );
      unwrapResult(msg);
      setResMsg(msg.payload);
      setPassword('');
      setConfirmPassword('');
    }
  };

  useEffect(() => {
    if (password !== confirmPassword && matchMessage === '') {
      setMatchMessage('passwords must match');
    } else if (
      password === confirmPassword &&
      matchMessage === 'passwords must match'
    ) {
      setMatchMessage('');
    }
  }, [password, confirmPassword, matchMessage]);

  return (
    <StyledResetPassword>
      <LogoActive size="42" />
      <h1>Reset Password</h1>
      <InputField
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        msg={{ err: true, msg: '' }}
      ></InputField>
      <InputField
        msg={{ err: true, msg: matchMessage }}
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        children="Submit"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--wide"
        onClick={submitHandler}
      />
      <p className={resMsg.err ? 'inputErr' : 'inputMsg'}>{resMsg.msg}</p>
      <Link to="/login">
        <Button type="button" buttonStyle="btn--stealth">
          Go to Login
        </Button>
      </Link>
    </StyledResetPassword>
  );
};
