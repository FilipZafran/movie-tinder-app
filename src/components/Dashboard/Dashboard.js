import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Friends } from '../Friends';
import { Invitations } from '../Invitations';
import { MatchPage } from '../MatchPage';
import { Profile } from '../Profile/Profile';
import { ProfileEdit } from '../Profile/ProfileEdit';
import { LikedMovies } from '../Profile/LikedMovies';
import { TopMatches } from '../Profile/TopMatches';
import { Start } from '../Start/Start';
import { BottomNav } from '../BottomNav';
import { ChatPage } from '../ChatPage';
import OtherProfile from '../Friends/OtherProfile';
import {
  fetchAllFriends,
  fetchFriendsInvitations,
  fetchFriendsRequests,
} from '../../Redux/friendsSlice';
import { fetchCurrentUser } from '../../Redux/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFriends());
    dispatch(fetchFriendsRequests());
    dispatch(fetchFriendsInvitations());
    dispatch(fetchCurrentUser());
  });

  return (
    <div className="dashboard">
      <Router>
        <BottomNav />
        <Switch>
          <Route path="/dashboard/Profile" component={Profile} />
          <Route path="/dashboard/ProfileEdit" component={ProfileEdit} />
          <Route path="/dashboard/LikedMovies" component={LikedMovies} />
          <Route path="/dashboard/TopMatches" component={TopMatches} />
          <Route path="/dashboard/Chat" component={ChatPage} />
          <Route path="/dashboard/users" component={Friends} />
          <Route path="/dashboard/invitations" component={Invitations} />
          <Route path="/dashboard/user" component={OtherProfile} />
          <Route path="/dashboard/matchPage" component={MatchPage} />
          <Route path="/dashboard" component={Start} />
        </Switch>
      </Router>
    </div>
  );
};

export default Dashboard;
