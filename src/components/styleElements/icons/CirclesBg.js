import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  .bigCircle {
    fill: ${(props) => (props.color === 'gold' ? 'var(--prime-700)' : 'none')};
  }
  .middleCircle {
    fill: ${(props) => (props.color === 'gold' ? 'var(--prime-500)' : 'none')};
  }
  .smallCircle {
    fill: ${(props) => (props.color === 'gold' ? 'var(--prime-300)' : 'none')};
  }
`;

export const CirclesBg = ({ color }) => {
  return (
    <StyledSvg
      color={color}
      width="237"
      height="186"
      viewBox="0 0 237 186"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="bigCircle" cx="119" cy="93" r="188" />
      <circle className="middleCircle" cx="119" cy="93" r="123.463" />
      <circle className="smallCircle" cx="119" cy="93" r="62.6667" />
    </StyledSvg>
  );
};
