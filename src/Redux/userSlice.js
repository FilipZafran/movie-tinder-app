import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { entities: [], loading: 'idle' };

const serverURL = process.env.REACT_APP_SERVER;

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const response = await axios({
      method: 'GET',
      withCredentials: true,
      url: `${serverURL}/authenticate/user`,
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
      withCredentials: true,
      url: `${serverURL}/authenticate/login`,
      data: user,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

//creates a slice called "user" set to the initial state defined above
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
