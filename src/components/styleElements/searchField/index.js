import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, ChevronLeft, X } from '../icons';

const StyledSearchField = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.active ? 'var(--dark-500)' : 'var(--dark-300)'};
  width: 295px;
  height: 40px;
  border-radius: 20px;
  border: 1.5px solid var(--dark-900);
  padding: 0px 20px;
  input {
    background: transparent;
    width: 285px;
    height: 16px;
    border-radius: 20px;
    border-style: none;
    text-align: left;
    padding: 12px 15px;
    color: var(--light-100);
    font-size: 15px;
    ::placeholder {
      color: var(--light-700);
      size: 13px;
    }
    :focus {
      background: transparent;
      outline: none;
    }
  }
  p {
    text-align: left;
    width: 300px;
    height: 20px;
    font-size: 13px;
  }
  .inputError {
    color: var(--error-500);
  }
  .inputMsg {
    color: var(--light-100);
  }
`;

const StyledSearchFieldContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const SearchField = ({
  value,
  placeholder,
  type,
  onChange,
  clearSearch,
  changeViewSearch,
}) => {
  const [active, setActive] = useState(false);

  return (
    <StyledSearchFieldContainer>
      <StyledSearchField
        active={active}
        onClick={() => {
          if (!active) {
            setActive(!active);
            changeViewSearch(!active);
          }
        }}
      >
        {active ? (
          <div
            onClick={() => {
              setActive(!active);
              changeViewSearch(!active);
              clearSearch();
            }}
          >
            <ChevronLeft size="24" className="activeLogo" />
          </div>
        ) : (
          <Search size="24" />
        )}
        <input
          onChange={onChange}
          type={type}
          value={value}
          placeholder={placeholder}
        ></input>
        {active ? (
          <div
            onClick={() => {
              setActive(!active);
              changeViewSearch(!active);
              clearSearch();
            }}
          >
            <X size="24" className="activeLogo" />
          </div>
        ) : null}
      </StyledSearchField>
    </StyledSearchFieldContainer>
  );
};
