import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  selectAllFriends,
  deleteFriend,
  sendFriendRequest,
} from '../../Redux/friendsSlice';
import { fetchSearchResults } from '../../Redux/userSlice';

export const SearchFriends = () => {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);

  const dispatch = useDispatch();
  const friends = useSelector(selectAllFriends) || [];

  const getPeople = async () => {
    try {
      const fetchPeople = await dispatch(fetchSearchResults(search));
      unwrapResult(fetchPeople);
      setPeople(fetchPeople.payload);
    } catch (err) {
      console.log(err);
    }
  };

  const friendsList = friends.map((x) => (
    <div key={x}>
      {x}
      <div onClick={() => dispatch(deleteFriend(x))}>Unfriend</div>
    </div>
  ));

  const peopleList = people.map((x) => (
    <div key={x}>
      {x}
      <div onClick={() => dispatch(sendFriendRequest(x))}>Friend Request</div>
    </div>
  ));

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
      {peopleList}
      <div>Friends: {friendsList}</div>
    </div>
  );
};
