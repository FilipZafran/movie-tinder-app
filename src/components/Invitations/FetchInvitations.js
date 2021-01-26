import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { UserEntry } from '../styleElements/UserEntry';
import { Heart } from '../styleElements/icons';
import {
  fetchFriendsInvitations,
  fetchFriendsRequests,
  fetchAllFriends,
  acceptFriendRequest,
  deleteFriend,
} from '../../Redux/friendsSlice';
import { TopNav } from '../TopNav';
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
  margin-top: 20vh;
`;

export const FetchInvitations = () => {
  const dispatch = useDispatch();
  const [invitations, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [displayReceived, setDisplayReceived] = useState(true);

  const pendingInvitations =
    invitations && invitations.length > 0 ? (
      invitations.map((x) => (
        <div key={x.id}>
          <UserEntry
            icon={<Heart size="24" />}
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
        <Text>No pending invitations!!</Text>
      </div>
    );
  const pendingRequests =
    requests && requests.length > 0 ? (
      requests.map((x) => (
        <div key={x.id}>
          <UserEntry
            icon={<Heart size="24" />}
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
        <Text>No pending requests!!</Text>
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
      <TopNav backIcon bellIcon title="Invitations" />
      <StyledButtons>
        <ReceivedButton
          clickHandler={() => setDisplayReceived(true)}
          label="Received"
          state={displayReceived}
        />
        <ReceivedButton
          clickHandler={() => setDisplayReceived(false)}
          label="Sent"
          state={displayReceived}
        />
      </StyledButtons>
      {displayReceived ? pendingInvitations : pendingRequests}
    </div>
  );
};
