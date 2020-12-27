import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestReset } from '../../Redux/resetSlice';
import {Button} from '../styleElements/buttons/Button'
import {TopNav} from '../TopNav';
import {InputField} from '../styleElements/inputField';
import styled from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';

const StyledRequestReset = styled.div`
height: 85vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    const msg = await dispatch(requestReset(email));
    unwrapResult(msg);
    setMessage(msg.payload);
    setEmail("");
  }

  return (

    <StyledRequestReset>
          <TopNav backIcon title="Account Recovery" text="Login" textLink="/" />
   
      <InputField
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-Mail"
        msg={message}
      ></InputField>
      <Button children="Send E-mail" buttonStyle="btn--primary--outline" onClick={onSubmit}/>
   
    </StyledRequestReset>
  );
};
