import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER;

const initialState = { entities: {}, loading: 'idle' };

export const fetchLikes = createAsyncThunk(
  'likeTracker/fetchLikes',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        withCredentials: true,
        url: `${serverURL}/likeTracker/likes`,
      });
      return response.data.dislikes;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchDislikes = createAsyncThunk(
  'likeTracker/fetchDislkes',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        withCredentials: true,
        url: `${serverURL}/likeTracker/dislikes`,
      });
      return response.data.likes;
    } catch (err) {
      console.log(err);
    }
  }
);

//creates moviesSlice when fetchMovies is fullfilled it will populate the movies slice
const likeTrackerSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLikes.fulfilled]: (state, action) => {
      state.entities.likes = action.payload;
    },
    [fetchDislikes.fulfilled]: (state, action) => {
      state.entities.dislikes = action.payload;
    },
  },
});

export default likeTrackerSlice.reducer;

//selects all moves from the redux store
//Note: the shape of the redux state is a bit awkward but I'm not sure how to clean this up
export const selectLikes = (state) => state.likeTracker.entities.likes;
export const selectDislikes = (state) => state.likeTracker.entities.dislikes;
