import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { SearchField } from '../styleElements/searchField';
import {
  selectAllFriends,
  deleteFriend,
  selectFriendsInvitations,
  selectFriendsRequests,
  fetchAllFriends,
  fetchFriendsRequests,
  acceptFriendRequest,
  fetchFriendsInvitations,
  sendFriendRequest,
} from '../../Redux/friendsSlice';
import { Heart, Clock } from '../styleElements/icons';
import { UserEntry } from '../styleElements/UserEntry';
import { fetchSearchResults } from '../../Redux/userSlice';
import { FetchInvitations } from '../Invitations/FetchInvitations';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import styled from 'styled-components';
import { ConfirmPopUp } from '../styleElements/ConfirmPopUp';

const StyledSearchResults = styled.div`
  width: 100vw;
  height: 70vh;
  overflow-y: auto;
`;

const StyledSearchFriends = styled.div`
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.div`
  height: 80px;
`;

export const SearchFriends = () => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);
  const [viewSearch, setViewSearch] = useState(false);

  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [statusChange, setStatusChange] = useState(false);
  const [friendId, setFriendId] = useState('');

  const dispatch = useDispatch();
  const friends = useSelector(selectAllFriends) || [];
  const request = useSelector(selectFriendsRequests) || [];
  const invitations = useSelector(selectFriendsInvitations) || [];

  const unfriend = async (id) => {
    try {
      await dispatch(deleteFriend(id));
      dispatch(fetchAllFriends());
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptFriend = async (id) => {
    try {
      await dispatch(acceptFriendRequest(id));
      dispatch(fetchFriendsInvitations());
      dispatch(fetchAllFriends());
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sendFriend = async (id) => {
    try {
      await dispatch(sendFriendRequest({ id: id }));
      dispatch(fetchFriendsRequests());
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelFriend = async (id) => {
    try {
      await dispatch(deleteFriend(id));
      dispatch(fetchFriendsRequests());
      setStatusChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getPeople = async () => {
    try {
      const fetchPeople = await dispatch(fetchSearchResults(search));
      unwrapResult(fetchPeople);
      setPeople(fetchPeople.payload.users);
    } catch (err) {
      console.log(err);
    }
    // }
  };

  const clearSearch = () => {
    setSearch('');
  };

  const peopleList =
    people?.length > 0 ? (
      people.map((x) => {
        const entry =
          friends.find((element) => element.id === x.id) !== undefined ? (
            <UserEntry
              clickHandler={() => {
                setShow(true);
                setFriendId(x);
                setText('unfriend');
              }}
              icon={<Heart active size="24" />}
              user={x}
            />
          ) : request.find((element) => element.id === x.id) !== undefined ? (
            <UserEntry
              icon={<Clock />}
              user={x}
              clickHandler={() => {
                setShow(true);
                setFriendId(x);
                setText('cancel friend request');
              }}
            />
          ) : invitations.find((element) => element.id === x.id) !==
            undefined ? (
            <UserEntry
              clickHandler={() => {
                setShow(true);
                setFriendId(x);
                setText('accept friend request');
              }}
              icon={<Clock />}
              user={x}
            />
          ) : (
            <UserEntry
              clickHandler={() => {
                setShow(true);
                setFriendId(x);
                setText('send friend request');
              }}
              icon={<Heart size="24" />}
              user={x}
            />
          );

        return <div key={x.id}>{entry}</div>;
      })
    ) : (
      <CirclesBackground />
    );

  useEffect(() => {
    getPeople();
  }, [search]);

  useEffect(() => {
    if (statusChange) {
      if (text === 'send friend request') {
        sendFriend(friendId.id);
      }
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
    <StyledSearchFriends>
      <ConfirmPopUp
        show={show}
        statusChange={(boolean) => setStatusChange(boolean)}
        text={text}
        friendId={friendId}
        closePopUp={(boolean) => setShow(boolean)}
      />
      <SearchField
        placeholder="Search for friends"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        clearSearch={clearSearch}
        changeViewSearch={(x) => setViewSearch(x)}
      />
      {viewSearch ? (
        <StyledSearchResults>
          {peopleList}
          <Placeholder />
        </StyledSearchResults>
      ) : (
        <FetchInvitations />
      )}
    </StyledSearchFriends>
  );
};
