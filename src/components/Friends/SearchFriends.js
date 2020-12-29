import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { SearchField } from '../styleElements/searchField';
import {
  selectAllFriends,
  deleteFriend,
  sendFriendRequest,
  selectFriendsInvitations,
  selectFriendsRequests,
  fetchAllFriends,
  acceptFriendRequest,
  fetchFriendsRequests,
  fetchFriendsInvitations,
} from '../../Redux/friendsSlice';
import { fetchSearchResults } from '../../Redux/userSlice';

export const SearchFriends = () => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);
  const [viewSearch, setViewSearch] = useState(false);

  const dispatch = useDispatch();
  const friends = useSelector(selectAllFriends) || [];
  const request = useSelector(selectFriendsRequests) || [];
  const invitations = useSelector(selectFriendsInvitations) || [];

  const getPeople = async () => {
    if (search === '') {
      setPeople([]);
    } else {
      try {
        const fetchPeople = await dispatch(fetchSearchResults(search));
        unwrapResult(fetchPeople);
        setPeople(fetchPeople.payload.users);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const clearSearch = () => {
    setSearch('');
  };

  const friendsList = friends.map((x) => (
    <div key={x.id}>
      {x.username}
      <div onClick={() => dispatch(deleteFriend(x.id))}>Unfriend</div>
    </div>
  ));

  const peopleList =
    people?.length > 0 ? (
      people.map((x) => {
        const button =
          friends.find((element) => element.id === x.id) !== undefined ? (
            <div
              onClick={async () => {
                try {
                  await dispatch(deleteFriend(x.id));
                  dispatch(fetchAllFriends());
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Unfriend
            </div>
          ) : request.find((element) => element.id === x.id) !== undefined ? (
            <div
              onClick={async () => {
                try {
                  await dispatch(deleteFriend(x.id));
                  dispatch(fetchFriendsRequests());
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Cancel
            </div>
          ) : invitations.find((element) => element.id === x.id) !==
            undefined ? (
            <div
              onClick={async () => {
                try {
                  await dispatch(acceptFriendRequest(x.id));
                  dispatch(fetchFriendsInvitations());
                  dispatch(fetchAllFriends());
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Accept
            </div>
          ) : (
            <div
              onClick={async () => {
                try {
                  await dispatch(sendFriendRequest({ id: x.id }));
                  dispatch(fetchFriendsRequests());
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Friend Request
            </div>
          );

        return (
          <div key={x.id}>
            {x.username}
            {button}
          </div>
        );
      })
    ) : (
      <></>
    );

  useEffect(() => {
    dispatch(fetchAllFriends());
    dispatch(fetchFriendsRequests());
    dispatch(fetchFriendsInvitations());
    getPeople();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <SearchField
        placeholder="Search for friends"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        clearSearch={clearSearch}
        changeViewSearch={(x) => setViewSearch(x)}
      />
      {viewSearch ? peopleList : friendsList}
    </div>
  );
};
