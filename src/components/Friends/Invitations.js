import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  fetchFriendsInvitations,
  fetchFriendsRequests,
  acceptFriendRequest,
  deleteFriend,
  fetchAllFriends,
} from '../../Redux/friendsSlice';

export const Invitations = () => {
  const dispatch = useDispatch();
  const [invitations, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);

  const pendingInvitations = invitations.map((x) => (
    <div key={x}>
      {x}
      <div
        onClick={() => {
          dispatch(acceptFriendRequest(x));
          dispatch(fetchAllFriends());
        }}
      >
        Accept
      </div>
    </div>
  ));
  const pendingRequests = requests.map((x) => (
    <div key={x}>
      {x}
      <div onClick={() => dispatch(deleteFriend(x))}>Cancel</div>
    </div>
  ));

  const fetchData = async () => {
    try {
      const fetchInvitations = await dispatch(fetchFriendsInvitations());
      const fetchRequests = await dispatch(fetchFriendsRequests());
      unwrapResult(fetchInvitations);
      unwrapResult(fetchRequests);
      setInvitations(fetchInvitations.payload);
      setRequests(fetchRequests.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>
        Invitations:
        {pendingInvitations}
      </div>
      <div>
        Requests:
        {pendingRequests}
      </div>
    </div>
  );
};
