import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
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
              onClick={() => {
                dispatch(deleteFriend(x.id));
                dispatch(fetchAllFriends());
              }}
            >
              Unfriend
            </div>
          ) : request.find((element) => element.id === x.id) !== undefined ? (
            <div
              onClick={() => {
                dispatch(deleteFriend(x.id));
                dispatch(fetchFriendsRequests());
              }}
            >
              Cancel
            </div>
          ) : invitations.find((element) => element.id === x.id) !==
            undefined ? (
            <div
              onClick={() => {
                dispatch(acceptFriendRequest(x.id));
                dispatch(fetchFriendsInvitations());
                dispatch(fetchAllFriends());
              }}
            >
              Accept
            </div>
          ) : (
            <div
              onClick={() => {
                dispatch(sendFriendRequest({ id: x.id }));
                dispatch(fetchFriendsRequests());
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
    getPeople();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <input
        type="text"
        name="searchPeople"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div>Users: {peopleList}</div>
      <div>Friends: {friendsList}</div>
    </div>
  );
};
