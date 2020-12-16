import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { entities: [], loading: 'idle' };

const serverURL = process.env.REACT_APP_SERVER;

export const fetchSearchResults = createAsyncThunk(
  'user/fetchSearchResults',
  async (username) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${serverURL}/profiles/findFriend`,
        headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
        data: username,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${serverURL}/profiles/user`,
      headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
      data: userId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${serverURL}/authenticate/login`,
      data: user,
    });
    if (response.data.msg === 'User successfully logged in') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('x-auth-token', response.data.token);
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${serverURL}/authenticate/register`,
        data: user,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//creates a slice called "user" set to the initial state defined above
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('x-auth-token');
    },
  },
  extraReducers: {},
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
