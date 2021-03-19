import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  z-index: 1;
  height: 400px;
`;

const Big = styled.circle`
  fill: ${(props) => `var(--${props.color}-900)`};
`;

const Medium = styled.circle`
  fill: ${(props) => `var(--${props.color}-500)`};
`;

const Small = styled.ellipse`
  fill: ${(props) => `var(--${props.color}-100)`};
`;

export const AvatarCircles = ({ color }) => {
  return (
    <Svg
      width="700"
      height="700"
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Big color={color} cx="350" cy="350" r="350" />
      <Medium color={color} cx="350" cy="350" r="250" />
      <Small color={color} cx="350" cy="350" rx="150" ry="150" />
    </Svg>
  );
};
