import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  fetchFriendsInvitations,
  fetchFriendsRequests,
  fetchAllFriends,
  acceptFriendRequest,
  deleteFriend,
} from '../../Redux/friendsSlice';
import { TopNav } from '../TopNav';

export const FetchInvitations = () => {
  const dispatch = useDispatch();
  const [invitations, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);

  const pendingInvitations = invitations?.map((x) => (
    <div key={x.id}>
      {x.username}
      <div
        onClick={async () => {
          try {
            await dispatch(acceptFriendRequest(x.id));
            fetchData();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Accept
      </div>
    </div>
  ));
  const pendingRequests = requests?.map((x) => (
    <div key={x.id}>
      {x.username}
      <div
        onClick={async () => {
          try {
            await dispatch(deleteFriend(x.id));
            fetchData();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Cancel
      </div>
    </div>
  ));

  const fetchData = async () => {
    try {
      const fetchInvitations = await dispatch(fetchFriendsInvitations());
      const fetchRequests = await dispatch(fetchFriendsRequests());
      dispatch(fetchAllFriends());
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
      <TopNav backIcon bellIcon title="Invitations" />
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
