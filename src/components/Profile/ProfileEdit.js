import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import { TopNav } from '../TopNav';
import { Toggle } from '../styleElements/controls/Toggle';
import Avatar from '../styleElements/avatar/Avatar.js';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 100
	}
}));

export function ProfileEdit() {
	const location = useLocation();

	const classes = useStyles();
	const [ value, setValue ] = useState('');

	const handleChange = (e) => setValue(e.target.value);

	return (
		<div>
			<CirclesBackground />
			<Link to='/dashboard//Profile'>
				<TopNav backIcon active={location.pathname === '/dashboard//Profile'} />
			</Link>

			<div className='profile__edit-containter'>
				<div className='profile__edit-footer'>
					<h1>Profile Settings </h1>
				</div>

				<div id='profile__edit-picture-container'>
					<Avatar className='profile__avatar' />
				</div>

				<div className='profile__edit-label-input'>
					<label> Username:</label>
					<input type='text' />
				</div>
				<div className='profile__edit-label-input profile__edit__age-select-wrapper'>
					<FormControl
						className={`${classes.formControl} profile__edit__age-select`}
						id='profile__edit-formcontrol'
					>
						<InputLabel id='profile__edit-inputlabel'>Age range:</InputLabel>
						<Select id='profile__edit-select' onChange={handleChange}>
							<MenuItem value={'Newb'}> Younger than 18yo</MenuItem>
							<MenuItem value={'Generation Z'}>Between 22 - 30yo</MenuItem>
							<MenuItem value={'Midlife Crisis'}> Between 30 - 40yo</MenuItem>
							<MenuItem value={'Golden Age'}> Between 40 - 50yo </MenuItem>
							<MenuItem value={'Veteran'}>Over 50yo </MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className='profile__edit-label-input'>
					<label> City: </label>
					<input type='text' />
				</div>

				<div className='profile__edit-label-input'>
					<label> Email: </label>
					<input type='text' />
				</div>

				<div className='profile__edit-label-input'>
					<label> Password: </label>
					<input type='text' />
				</div>

				<div className='profile__edit-current-filters'>
					<h4> Current filters: - - - EDIT SYMBOL</h4>
					<div className='profile__edit-span-container'>
						<span>1970s</span>
						<span>1980s</span>
						<span>Art</span>
						<span>Indy</span>
						<span>Si-Fi</span>
						<span>Western</span>
						<span>Si-Fi</span>
						<span>Western</span>
					</div>
				</div>

				<Link to='/Profile'>
					<button className='profile__bttn' active={location.pathname === '/dashboard//Profile'}>
						--- SAVE ICON -- Save
					</button>
				</Link>

				<div className='profile__edit-likes-friends'>
					<div className='profile__edit-grid'>
						<p className='profile__p-text'>Show likes on profile page</p>
						<Toggle />
					</div>
					<div className='profile__edit-grid'>
						<p className='profile__p-text'>Show matches on profile page</p>
						<Toggle />
					</div>
				</div>
			</div>
		</div>
	);
}
