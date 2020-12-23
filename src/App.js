import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/UserPathLog/Login';
import Registration from './components/UserPathLog/Register';
import { ResetPassword } from './components/ResetPassword';
import { UnderConstruction } from './components/UnderConstruction';
import { CirclesBackground } from './components/styleElements/CirclesBackground';

const App = (props) => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/resetPassword/:token">
          <ResetPassword />
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
