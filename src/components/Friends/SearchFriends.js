import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  selectAllFriends,
  deleteFriend,
  sendFriendRequest,
} from '../../Redux/friendsSlice';

export const SearchFriends = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectAllFriends());

  const people = async () => {
    try {
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
      <div onClick={() => dispatch(deleteFriend(x))}>Unfriend</div>
    </div>
  ));

  return (
    <div>
      {peopleList}
      {friendsList}
    </div>
  );
};
