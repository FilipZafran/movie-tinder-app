import React from 'react';
import './Icon.css';

export const Unlock = ({ size }) => {
  return (
    <svg
      width={size ? size : null}
      height={size ? size : null}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6667 8.5H5.33333C4.59695 8.5 4 9.23262 4 10.1364V15.8636C4 16.7674 4.59695 17.5 5.33333 17.5H14.6667C15.403 17.5 16 16.7674 16 15.8636V10.1364C16 9.23262 15.403 8.5 14.6667 8.5Z"
        className="inactiveIcon"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 8.5V5.83482C6.99925 5.00865 7.27775 4.21164 7.78144 3.59852C8.28513 2.9854 8.97808 2.5999 9.72576 2.51687C10.4734 2.43384 11.2225 2.6592 11.8276 3.1492C12.4326 3.6392 12.8505 4.35888 13 5.16853"
        className="inactiveIcon"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
