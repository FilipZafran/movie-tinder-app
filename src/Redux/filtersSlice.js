import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { entities: [], loading: 'idle' };

const serverURL = process.env.REACT_APP_SERVER;

export const fetchAllFilters = createAsyncThunk(
  'allFilters/fetchAllFilters',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        withCredentials: true,
        url: `${serverURL}/movies/filterNames`,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default filtersSlice.reducer;
