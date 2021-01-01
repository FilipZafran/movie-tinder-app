import React from 'react';
import styled from 'styled-components';

const StyledInputField = styled.div`
margin: 5px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
input {
    margin: 5px;
    background: var(--dark-900-25);
    width: 285px;
    height: 24px;
    border-radius: 10px;
    border-style: none;
    text-align: left;
    padding: 12px 24px;
    color: var(--light-100);
    font-size: 15px;
    ::placeholder {
        color: var(--light-500);
        size: 15px;
    }
    :focus {
        background: var(--dark-900-50);
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

export const InputField = ({msg, value, placeholder, type, onChange}) => {

    return (
        <StyledInputField>
            <input onChange={onChange} type={type} value={value} placeholder={placeholder}></input><p className={msg.err ? "inputError" : "inputMsg" }>{msg.msg}</p>
        </StyledInputField>
    )
}