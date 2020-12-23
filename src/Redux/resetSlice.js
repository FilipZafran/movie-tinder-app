import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { entities: [], loading: 'idle' };

const serverURL = process.env.REACT_APP_SERVER;

export const requestReset = createAsyncThunk(
  'reset/requestReset',
  async (email) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${serverURL}/resetPassword/reset`,
        data: { email: email },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'reset/resetPassword',
  async (password, token) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${serverURL}/resetPassword/newPassword`,
        data: { password: password, token: token },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//creates a slice called "user" set to the initial state defined above
const resetSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default resetSlice.reducer;
