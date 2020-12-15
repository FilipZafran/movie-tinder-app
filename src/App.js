import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/UserPathLog/Login';
import FindPeople from './components/Friends/FindPeople';
import OtherProfile from './components/Friends/OtherProfile';
import Registration from './components/UserPathLog/Register';
import Resetpw from './components/UserPathLog/Resetpw';
import { UnderConstruction } from './components/UnderConstruction';
import { CirclesBackground } from './components/styleElements/CirclesBackground';

const App = (props) => {
  const [otheridtoparents, setOtherProfileID] = useState('');
  const handleProfileID = (newAppID) => {
    setOtherProfileID(newAppID);
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <Route path="/dashboard/users">
          <FindPeople
            onChange={handleProfileID}
            setOtherProfileID={setOtherProfileID}
          />
        </Route>
        <Route exact path="/dashboard/user/:id">
          <OtherProfile
            onChange={handleProfileID}
            setOtherProfileID={setOtherProfileID}
          />
        </Route>

        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/resetpw">
          <Resetpw />
        </Route>

        <Route path="/">
          <Login />
          <CirclesBackground />
          <UnderConstruction />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
