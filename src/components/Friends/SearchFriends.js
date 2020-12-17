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
    <div key={x}>
      {x}
      <div onClick={() => dispatch(deleteFriend(x))}>Unfriend</div>
    </div>
  ));

  const peopleList =
    people?.length > 0 ? (
      people.map((x) => {
        const button =
          friends.indexOf(x) >= 0 ? (
            <div
              onClick={() => {
                dispatch(deleteFriend(x));
                dispatch(fetchAllFriends());
              }}
            >
              Unfriend
            </div>
          ) : request.indexOf(x) >= 0 ? (
            <div
              onClick={() => {
                dispatch(deleteFriend(x));
                dispatch(fetchFriendsRequests());
              }}
            >
              Cancel
            </div>
          ) : invitations.indexOf(x) >= 0 ? (
            <div
              onClick={() => {
                dispatch(acceptFriendRequest(x));
                dispatch(fetchFriendsInvitations());
                dispatch(fetchAllFriends());
              }}
            >
              Accept
            </div>
          ) : (
            <div
              onClick={() => {
                dispatch(sendFriendRequest({ id: x }));
                dispatch(fetchFriendsRequests());
              }}
            >
              Friend Request
            </div>
          );

        return (
          <div key={x}>
            {x}
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
