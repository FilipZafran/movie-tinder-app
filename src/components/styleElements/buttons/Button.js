import React from "react";
import "./button.css";

/* css className variables for STYLE and SIZE can be set in probs */

const STYLES = [
  "btn--primary--solid",
  "btn--primary--outline",
  "btn--secondary--solid",
  "btn--secondary--outline",
  "btn--stealth",
];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  /* Vriable checks if prop matches with STYLES and SIZE vriables if not it will be set to default */
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
