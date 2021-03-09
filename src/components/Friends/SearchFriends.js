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
import { Heart, Clock } from '../styleElements/icons';
import { UserEntry } from '../styleElements/UserEntry';
import { fetchSearchResults } from '../../Redux/userSlice';
import { FetchInvitations } from '../Invitations/FetchInvitations';
import { CirclesBackground } from '../styleElements/CirclesBackground';

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

  const peopleList =
    people?.length > 0 ? (
      people.map((x) => {
        const entry =
          friends.find((element) => element.id === x.id) !== undefined ? (
            <UserEntry
              clickHandler={async () => {
                try {
                  await dispatch(deleteFriend(x.id));
                  dispatch(fetchAllFriends());
                } catch (err) {
                  console.log(err);
                }
              }}
              icon={<Heart active size="24" />}
              user={x}
            />
          ) : request.find((element) => element.id === x.id) !== undefined ? (
            <UserEntry icon={<Clock />} user={x} clickHandler={() => {}} />
          ) : invitations.find((element) => element.id === x.id) !==
            undefined ? (
            <UserEntry
              clickHandler={async () => {
                try {
                  await dispatch(acceptFriendRequest(x.id));
                  dispatch(fetchFriendsInvitations());
                  dispatch(fetchAllFriends());
                } catch (err) {
                  console.log(err);
                }
              }}
              icon={<Clock />}
              user={x}
            />
          ) : (
            <UserEntry
              clickHandler={async () => {
                try {
                  await dispatch(sendFriendRequest({ id: x.id }));
                  dispatch(fetchFriendsRequests());
                } catch (err) {
                  console.log(err);
                }
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
      {viewSearch ? peopleList : <FetchInvitations />}
    </div>
  );
};
