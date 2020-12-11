import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import likeTrackerReducer from './likeTrackerSlice';
import filtersReducer from './filtersSlice';
import friendsReducer from './friendsSlice';
import moviesReducer from './moviesSlice';

//creates a redux store with defined slices and imports the reducers for each

export default configureStore({
  reducer: {
    user: userReducer,
    likeTracker: likeTrackerReducer,
    filters: filtersReducer,
    friends: friendsReducer,
    movies: moviesReducer,
  },
});
