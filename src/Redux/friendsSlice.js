import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER;
const token = localStorage.getItem('x-auth-token');

const initialState = { entities: {}, loading: 'idle' };

export const fetchFriendsInvitations = createAsyncThunk(
  'friends/fetchFriendsInvitations',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${serverURL}/friends/invitations`,
        headers: { 'x-auth-token': token },
      });
      console.log(response.data);
      return response.data.pendingInvitations;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchFriendsRequests = createAsyncThunk(
  'friends/fetchFriendsRequests',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${serverURL}/friends/requests`,
        headers: { 'x-auth-token': token },
      });
      console.log(response.data);
      return response.data.pendingRequests;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchAllFriends = createAsyncThunk(
  'friends/fetchAllFriends',
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${serverURL}/friends/allFriends`,
        headers: { 'x-auth-token': token },
      });
      console.log(response.data);
      return response.data.friends;
    } catch (err) {
      console.log(err);
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  'friends/sendFriendRequest',
  async (otherId) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${serverURL}/friends/sendRequest`,
        headers: { 'x-auth-token': token },
        data: otherId,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptFriendRequest',
  async (otherId) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${serverURL}/friends/acceptRequest/${otherId}`,
        headers: { 'x-auth-token': token },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteFriend = createAsyncThunk(
  'friends/deleteFriend',
  async (otherId) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${serverURL}/friends/removeFriend/${otherId}`,
        headers: { 'x-auth-token': token },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllFriends.fulfilled]: (state, action) => {
      state.entities.allFriends = action.payload;
    },
    [fetchFriendsInvitations.fulfilled]: (state, action) => {
      state.entities.invitations = action.payload;
    },
    [fetchFriendsRequests.fulfilled]: (state, action) => {
      state.entities.requests = action.payload;
    },
  },
});

export default friendsSlice.reducer;

export const selectAllFriends = (state) =>
  state.friends ? state.friends.entities.allFriends : [];

export const selectFriendsInvitations = (state) =>
  state.friends ? state.friends.entities.invitations : [];

export const selectFriendsRequests = (state) =>
  state.friends ? state.friends.entities.requests : [];
