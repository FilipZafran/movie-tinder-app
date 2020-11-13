import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory, Link } from 'react-router-dom';
// import Movies from './Movies';
import Friends from '../Friends/Friends';
import MatchPage from '../MatchMovies/MatchPage';
import { Profile } from '../Profile/Profile';
import { Start } from '../Start/Start'
import store from '../../Redux/store';
import { BottomNav } from '../BottomNav/index';
import { fetchUser } from '../../Redux/userSlice'


const Dashboard = () => {
	//gets the logged in user and stores it in the REDUX store
	useEffect(() => {
		store.dispatch(fetchUser());
	}, []);

	return (
		<div className="dashboard">
			<Router>
				<BottomNav />
				<Switch>
					<Route path="/profile" component={Profile} />
					<Route path="/Friends" component={Friends} />
					<Route path="/MatchPage" component={MatchPage} />
					<Route path="/" component={Start} />
				</Switch>
			</Router>
		</div>
	);
};

export default Dashboard;