import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  .bigCircle {
    fill: ${(props) =>
      props.color === 'gold' ? 'var(--prime-700)' : 'var(--dark-500)'};
  }
  .middleCircle {
    fill: ${(props) =>
      props.color === 'gold' ? 'var(--prime-500)' : 'var(--dark-300)'};
  }
  .smallCircle {
    fill: ${(props) =>
      props.color === 'gold' ? 'var(--prime-300)' : 'var(--dark-100)'};
  }
`;

export const CirclesBg = ({ color, size }) => {
  return (
    <StyledSvg
      color={color}
      width={size === 'middle' ? '600' : '237'}
      height={size === 'middle' ? '800' : '186'}
      viewBox={size === 'middle' ? '0 0 600 800' : '0 0 237 186'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="bigCircle"
        cx={size === 'middle' ? '300' : '119'}
        cy={size === 'middle' ? '400' : '93'}
        r={size === 'middle' ? '300' : '188'}
      />
      <circle
        className="middleCircle"
        cx={size === 'middle' ? '300' : '119'}
        cy={size === 'middle' ? '400' : '93'}
        r={size === 'middle' ? '170' : '123.463'}
      />
      <circle
        className="smallCircle"
        cx={size === 'middle' ? '300' : '119'}
        cy={size === 'middle' ? '400' : '93'}
        r={size === 'middle' ? '80' : '62.6667'}
      />
    </StyledSvg>
  );
};

// export const CirclesBg = ({ color }) => {
//   return (
//     <StyledSvg
//       color={color}
//       width="237"
//       height="186"
//       viewBox="0 0 237 186"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle className="bigCircle" cx="119" cy="93" r="188" />
//       <circle className="middleCircle" cx="119" cy="93" r="123.463" />
//       <circle className="smallCircle" cx="119" cy="93" r="62.6667" />
//     </StyledSvg>
//   );
// };
