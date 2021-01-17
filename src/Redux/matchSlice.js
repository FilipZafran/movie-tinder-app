import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { entities: {}, loading: 'idle' };

export const fetchMatches = createAsyncThunk(
  'match/fetchMatches',
  async (filmId) => {
    try {
      const response = await axios({
        method: 'GET',
        headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
        url: `/matches/oneFilm/${filmId}`,
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
