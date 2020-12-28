import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router';
import { resetPassword } from '../../Redux/resetSlice';
import {Button} from '../styleElements/buttons/Button';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';


const StyledResetPassword = styled.div`
height: 85vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
input {
  margin-top: 30px;
}
p {
  margin-bottom: 30px;
}
`;

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchMessage, setMatchMessage] = useState("");
  const [checkPass, setCheckPass] = useState('');
  const dispatch = useDispatch();
  const {token} = useParams();

  const submitHandler = (e) => {
    if (password === '' || password !== confirmPassword) {
      setCheckPass('Invalid Password')
    }
   else {
      dispatch(resetPassword({password: password, token: token}));
      setPassword("");
      setConfirmPassword("");
    }
  }


useEffect(() => {
  if (password !== confirmPassword && matchMessage === "") {
    setMatchMessage('passwords must match')
  }
  else if (password === confirmPassword && matchMessage === 'passwords must match'){
    setMatchMessage("")
  }
}, [password, confirmPassword, matchMessage]
)

  return (
    <StyledResetPassword>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <p>{matchMessage}</p>
      <Button children="Submit" buttonStyle="btn--primary--outline" onClick={submitHandler} />
    <p>{checkPass}</p>
    <Link to="/">to Login</Link>
    </StyledResetPassword>
  );
};
