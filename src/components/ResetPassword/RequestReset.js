import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestReset } from '../../Redux/resetSlice';

export const RequestReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="requestReset">
      <button onClick={(e) => dispatch(requestReset(email))}>
        reset password
      </button>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e-mail"
      ></input>
    </div>
  );
};
