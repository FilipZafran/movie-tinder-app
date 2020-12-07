import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profilePrime from '../../Resources/profile_prime.png';
import { loginUser } from '../../Redux/userSlice';

const ConstructionContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ConstructionBox = styled.div`
  background: var(--dark-900-50);
  width: 380px;
  height: 200px;
  border: 2px solid var(--dar-700);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: center;
`;

const ConstructionImage = styled.div`
  display: flex;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  justify-content: center;
  overflow: hidden;
  width: 160px;
  height: 200px;
  img {
    max-height: 100%;
  }
`;

const ConstructionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const ConstructionTitle = styled.div`
  text-align: left;
  font-size: 25px;
  margin-bottom: 10px;
  color: var(--light-100);
`;

const ConstructionText = styled.div`
  text-align: left;
  width: 220px;
  font-size: 12px;
  margin-bottom: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DemoButton = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 10px;
  background: var(--dark-300);
`;

export const UnderConstruction = () => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(loginUser({ username: 'Admin', password: 'password' }));
    console.log('logged in to demo account');
  };

  return (
    <ConstructionContainer>
      <ConstructionBox>
        <ConstructionImage>
          <img src={profilePrime} alt="Filmably Logo" />
        </ConstructionImage>
        <ConstructionContent>
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
