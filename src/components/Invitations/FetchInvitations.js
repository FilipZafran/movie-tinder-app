import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { UserEntry } from '../styleElements/UserEntry';
import { Heart, Clock } from '../styleElements/icons';
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
import { ConfirmPopUp } from '../styleElements/ConfirmPopUp';
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

const StyledPeopleList = styled.div`
  height: 65vh;
  width: 100vw;
  overflow-y: auto;
`;

const StyledFetchInvitations = styled.div`
  width: 100vw;
`;

const Placeholder = styled.div`
  height: 80px;
`;

export const FetchInvitations = () => {
  const dispatch = useDispatch();
  const [invitations, setInvitations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [display, setDisplay] = useState('friends');

  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [statusChange, setStatusChange] = useState(false);
  const [friendId, setFriendId] = useState('');

  const friends = useSelector(selectAllFriends) || [];

  const acceptFriend = async (id) => {
    try {
      await dispatch(acceptFriendRequest(id));
      fetchData();
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelFriend = async (id) => {
    try {
      await dispatch(deleteFriend(id));
      fetchData();
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const unfriend = async (id) => {
    try {
      await dispatch(deleteFriend(id));
      dispatch(fetchAllFriends());
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const pendingInvitations =
    invitations && invitations.length > 0 ? (
      invitations.map((x) => (
        <div key={x.id}>
          <UserEntry
            icon={<Clock />}
            clickHandler={() => {
              setShow(true);
              setFriendId(x);
              setText('accept friend request');
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
            icon={<Clock />}
            clickHandler={() => {
              setShow(true);
              setFriendId(x);
              setText('cancel friend request');
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
            clickHandler={() => {
              setShow(true);
              setFriendId(x);
              setText('unfriend');
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

  useEffect(() => {
    if (statusChange) {
      if (text === 'accept friend request') {
        acceptFriend(friendId.id);
      }
      if (text === 'unfriend') {
        unfriend(friendId.id);
      }
      if (text === 'cancel friend request') {
        cancelFriend(friendId.id);
      }
    }
  }, [statusChange]);

  return (
    <StyledFetchInvitations>
      <ConfirmPopUp
        show={show}
        statusChange={(boolean) => setStatusChange(boolean)}
        text={text}
        friendId={friendId}
        closePopUp={(boolean) => setShow(boolean)}
      />
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
      <StyledPeopleList>
        {display === 'received'
          ? pendingInvitations
          : display === 'sent'
          ? pendingRequests
          : friendsList}
        <Placeholder />
      </StyledPeopleList>
    </StyledFetchInvitations>
  );
};
