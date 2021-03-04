import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { UserEntry } from '../styleElements/UserEntry';
import { Heart, ArrowHeart } from '../styleElements/icons';
import {
  selectAllFriends,
  fetchFriendsInvitations,
  fetchFriendsRequests,
  fetchAllFriends,
  acceptFriendRequest,
  deleteFriend,
} from '../../Redux/friendsSlice';
import { ReceivedButton } from './ReceivedButton';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import styled from 'styled-components';

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: center;
`;

const Text = styled.div`
  margin-top: 15vh;
`;

export const FetchInvitations = () => {
  const dispatch = useDispatch();
  const [invitations, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [display, setDisplay] = useState('friends');

  const friends = useSelector(selectAllFriends) || [];

  const pendingInvitations =
    invitations && invitations.length > 0 ? (
      invitations.map((x) => (
        <div key={x.id}>
          <UserEntry
            icon={<ArrowHeart size="24" />}
            clickHandler={async () => {
              try {
                await dispatch(acceptFriendRequest(x.id));
                fetchData();
              } catch (err) {
                console.log(err);
              }
            }}
            user={x}
          />
        </div>
      ))
    ) : (
      <div>
        <CirclesBackground />
        <Text>No pending requests received!!</Text>
      </div>
    );
  const pendingRequests =
    requests && requests.length > 0 ? (
      requests.map((x) => (
        <div key={x.id}>
          <UserEntry
            icon={<ArrowHeart size="24" />}
            clickHandler={async () => {
              try {
                await dispatch(deleteFriend(x.id));
                fetchData();
              } catch (err) {
                console.log(err);
              }
            }}
            user={x}
          />
        </div>
      ))
    ) : (
      <div>
        <CirclesBackground />
        <Text>No pending requests sent!!</Text>
      </div>
    );

  const friendsList =
    friends && friends.length > 0 ? (
      friends.map((x) => (
        <div key={x.id}>
          <UserEntry
            icon={<Heart active size="24" />}
            clickHandler={async () => {
              try {
                await dispatch(deleteFriend(x.id));
                dispatch(fetchAllFriends());
              } catch (err) {
                console.log(err);
              }
            }}
            user={x}
          />
        </div>
      ))
    ) : (
      <div>
        <CirclesBackground />
        <Text>Click the search bar to find friends!!</Text>
      </div>
    );

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
  }, []);
  return (
    <div>
      <StyledButtons>
        <ReceivedButton
          clickHandler={() => setDisplay('friends')}
          label="Friends"
          type="friends"
          state={display}
        />
        <ReceivedButton
          clickHandler={() => setDisplay('received')}
          label="Received"
          type="received"
          state={display}
        />
        <ReceivedButton
          clickHandler={() => setDisplay('sent')}
          label="Sent"
          type="sent"
          state={display}
        />
      </StyledButtons>
      {display === 'received'
        ? pendingInvitations
        : display === 'sent'
        ? pendingRequests
        : friendsList}
    </div>
  );
};
