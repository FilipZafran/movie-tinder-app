import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER;

const initialState = { entities: {}, loading: 'idle' };

export const fetchAllFilters = createAsyncThunk(
  'filters/fetchAllFilters',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${serverURL}/movies/filterNames`,
      });
      return response.data.filters;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchActiveFilters = createAsyncThunk(
  'filters/fetchActiveFilters',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
        url: `${serverURL}/likeTracker/filters`,
      });
      return response.data.filters;
    } catch (err) {
      console.log(err);
      localStorage.removeItem('isAuthenticated');
      return { timeFilters: [], genreFilters: [] };
    }
  }
);

export const submitActiveFilters = createAsyncThunk(
  'filters/submitActiveFilters',
  async (filters) => {
    try {
      const response = await axios({
        method: 'POST',
        headers: { 'x-auth-token': localStorage.getItem('x-auth-token') },
        url: `${serverURL}/likeTracker/filters`,
        data: {
          filters: {
            genreFilters: filters.genreFilters,
            timeFilters: filters.timeFilters,
          },
        },
      });
      return response.data;
    } catch (err) {
      localStorage.removeItem('isAuthenticated');
      console.log(err);
    }
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActiveFilters.fulfilled]: (state, action) => {
      state.entities.activeFilters = action.payload;
    },
    [fetchAllFilters.fulfilled]: (state, action) => {
      state.entities.allFilters = action.payload;
    },
  },
});

export default filtersSlice.reducer;

export const selectAllFilters = (state) => state.filters.entities.allFilters;
export const selectActiveFilters = (state) =>
  state.filters.entities.activeFilters;
