import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestReset } from '../../Redux/resetSlice';
import {Button} from '../styleElements/buttons/Button'
import {TopNav} from '../TopNav';
import styled from 'styled-components';

const StyledRequestReset = styled.div`
height: 85vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
input {
  margin-bottom: 30px;
}
`;

export const RequestReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  return (

    <StyledRequestReset>
          <TopNav backIcon title="Account Recovery" text=" "/>
   
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e-mail"
      ></input>
      <Button children="Send E-mail" buttonStyle="btn--primary--outline" onClick={(e) => dispatch(requestReset(email))}/>
   
    </StyledRequestReset>
  );
};
