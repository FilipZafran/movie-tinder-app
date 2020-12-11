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
      state.entities.preload = [
        ...state.entities.preload,
        ...state.entities.toSwipe.slice(0, 5),
      ];
      state.entities.toSwipe = state.entities.toSwipe.slice(5);
    },
    preloadRemoveOne(state) {
      state.entities.current = state.entities.preload.shift();
    },
  },
  extraReducers: {
    [fetchToSwipe.fulfilled]: (state, action) => {
      state.entities.toSwipe = action.payload.slice(6);
      state.entities.preload = action.payload.slice(1, 6);
      state.entities.current = action.payload[0];
    },
  },
});

export const { preloadAdded, preloadRemoveOne } = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectToSwipe = (state) =>
  state.movies ? state.movies.entities.toSwipe : [];

export const selectPreload = (state) =>
  state.movies ? state.movies.entities.preload : [];

export const selectCurrent = (state) => {
  if (state.movies.entities.current) {
    return state.movies.entities.current;
  } else {
    return { crew: '' };
  }
};
