import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER;

const initialState = { entities: {}, loading: 'idle' };

export const fetchToSwipe = createAsyncThunk(
  'movies/fetchToSwipe',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        withCredentials: true,
        url: `${serverURL}/toSwipe`,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    preloadAdded(state) {
      state.entities.preload.push(state.entities.toSwipe.slice(0, 5));
      state.entities.toSwipe = state.entities.toSwipe.slice(5);
    },
    preloadRemoveOne(state) {
      state.entities.preload.shift();
    },
  },
  extraReducers: {
    [fetchToSwipe.fulfilled]: (state, action) => {
      state.entities.toSwipe = action.payload;
    },
  },
});

export const { preloadAdded, preloadRemoveOne } = moviesSlice.reducer;

export default moviesSlice.reducer;

export const selectToSwipe = (state) =>
  state.movies ? state.movies.entities.toSwipe : [];

export const selectPreload = (state) =>
  state.movies ? state.movies.entities.preload : [];

export const selectCurrent = (state) =>
  state.movies.entities.preload
    ? {
        ...state.movies.entities.preload[0],
        crew: state.movies.entities.preload[0]['crew']
          .replace('dir.', 'director')
          .split(', '),
      }
    : { crew: [] };
