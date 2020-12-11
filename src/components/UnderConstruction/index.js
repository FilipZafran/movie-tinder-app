import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profilePrime from '../../Resources/profile_prime.png';
import { loginUser } from '../../Redux/userSlice';
import { X } from '../styleElements/icons';
import {
  ConstructionContainer,
  ConstructionBox,
  ConstructionImage,
  ConstructionContent,
  ConstructionText,
  ConstructionTitle,
  ButtonContainer,
  DemoButton,
  ConstructionClose,
  CloseContainer,
} from './StyledUnderConstruction';

export const UnderConstruction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [display, setDisplay] = useState(true);

  const closeHandler = () => {
    setDisplay(!display);
  };
  const clickHandler = async () => {
    try {
      const login = await dispatch(
        loginUser({ username: 'Admin', password: 'password' })
      );
      unwrapResult(login);
      if (login.payload.msg === 'User successfully logged in') {
        history.replace('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConstructionContainer display={display.toString()}>
      <ConstructionBox>
        <ConstructionImage>
          <img src={profilePrime} alt="Filmably Logo" />
        </ConstructionImage>
        <ConstructionContent>
          <CloseContainer>
            <ConstructionClose onClick={closeHandler}>
              <X size={16} />
            </ConstructionClose>
          </CloseContainer>
          <ConstructionTitle>Pardon our mess!</ConstructionTitle>
          <ConstructionText>
            Filmably is still under construction. To have a look around, feel
            free to regiser or click the button below to use our demo account.
          </ConstructionText>
          <ButtonContainer>
            <DemoButton onClick={clickHandler}>Demo Account</DemoButton>
          </ButtonContainer>
        </ConstructionContent>
      </ConstructionBox>
    </ConstructionContainer>
  );
};
