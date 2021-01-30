import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 90px;
  height: 90px;
`;

const Circles = styled.div`
  .SvgCircle {
    z-index: 1;
    height: 500px;
    width: 500px;
  }
  .circleBig {
    fill: var(--prime-700);
  }
  .circleMedium {
    fill: var(--prime-500);
  }
  .circleSmall {
    fill: var(--prime-300);
  }
`;

const Background = () => {
  return (
    <Container>
      <Circles>
        <svg
          className="SvgCircle"
          width="700"
          height="700"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="circleBig" cx="350" cy="350" r="350" />
          <circle className="circleMedium" cx="350" cy="350" r="250" />
          <ellipse
            className="circleSmall"
            cx="350"
            cy="350"
            rx="150"
            ry="150"
          />
        </svg>
      </Circles>
    </Container>
  );
};

export default Background;
