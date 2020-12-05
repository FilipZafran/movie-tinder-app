import React from 'react';
import styled from 'styled-components';
import profilePrime from '../../Resources/profile_prime.png';

const ConstructionContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: center;
`;

const ConstructionImage = styled.div`
  margin-right: 10px;
  width: 30vw;
  height: 30vw;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ConstructionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConstructionTitle = styled.div`
  text-align: left;
  font-size: 25px;
`;

const ConstructionText = styled.div`
  text-align: left;
  width: 60vw;
  font-size: 12px;
`;

const DemoButton = styled.div`
  margin: 5px;
  cursor: pointer;
`;

export const UnderConstruction = () => {
  return (
    <ConstructionContainer>
      <ConstructionImage>
        <img src={profilePrime} alt="Filmably Logo" />
      </ConstructionImage>
      <ConstructionContent>
        <ConstructionTitle>Pardon our mess!</ConstructionTitle>
        <ConstructionText>
          Filmably is still under construction. To have a look around, feel free
          to regiser or click the button below to login with our demo account.
          Please keep in mind that during development any new accounts could be
          lost or deleted at any time!
        </ConstructionText>
        <DemoButton>Demo Account</DemoButton>
      </ConstructionContent>
    </ConstructionContainer>
  );
};
