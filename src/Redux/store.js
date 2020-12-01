import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './moviesSlice';
import filtersReducer from './filtersSlice';

//creates a redux store with defined slices and imports the reducers for each

export default configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    filters: filtersReducer,
  },
});
