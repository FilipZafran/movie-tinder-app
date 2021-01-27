import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER;

const initialState = { entities: {}, loading: 'idle' };

export const fetchMatches = createAsyncThunk(
  'match/fetchMatches',
  async (data) => {
    try {
      const response = await axios({
        method: 'POST',
        headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
        url: `${serverURL}/matches/oneFilm`,
        data: data,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default matchSlice.reducer;
