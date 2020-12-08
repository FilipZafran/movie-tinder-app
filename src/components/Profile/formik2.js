import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import { CirclesBackground } from '../styleElements/CirclesBackground';
import { TopNav } from '../TopNav';
import { Toggle } from '../styleElements/controls/Toggle';
import Avatar from '../styleElements/avatar/Avatar.js';
import { Check } from '../styleElements/icons/Check.js';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 100
	}
}));

const ranges = [
	{
		value: 'none',
		label: 'none'
	},
	{
		value: 'Newb',
		label: 'Younger than 18yo'
	},
	{
		value: 'Generation Z',
		label: 'Between 22 - 30yo'
	},
	{
		value: 'Midlife Crisis',
		label: 'Between 30 - 40yo'
	},
	{
		value: 'Golden Age',
		label: 'Between 40 - 50yo'
	},
	{
		value: 'Veteran',
		label: 'Over 50yo '
	}
];

interface Values {
	email: string
}

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

				<Formik
					initialValues={{
						username: '',
						select: 'none',
						city: '',
						email: '',
						password: ''
					}}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
							errors.email = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							setSubmitting(false);
							alert(JSON.stringify(values, null, 2));
						}, 500);
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<div className='profile__edit-label-input'>
								<label> Username:</label>
								<input type='text' name='username' />
							</div>
							<div className='profile__edit-label-input profile__edit__age-select-wrapper'>
								<Field
									component={TextField}
									type='text'
									name='select'
									label='With Select'
									select
									variant='standard'
									helperText='Please select your Age-Range'
									margin='normal'
									InputLabelProps={{
										shrink: true
									}}
								>
									{ranges.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Field>
							</div>
							<div className='profile__edit-label-input'>
								<label> City: </label>
								<input type='text' name='city' />
							</div>
							<div className='profile__edit-label-input'>
								<label> Email: </label>
								<Field component={TextField} name='email' type='email' label='Email' />
							</div>
							<div className='profile__edit-label-input'>
								<label> Password: </label>

								<Field
									component={TextField}
									name='email'
									type='email'
									label='Email'
									helperText='Please Enter Email'
								/>
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
							<Link to='/dashboard/Profile'>
								<button
									className='profile__bttn'
									active={location.pathname === '/dashboard/Profile'}
									type='submit'
									disabled={isSubmitting}
									onClick={submitForm}
								>
									<Check /> &nbsp; Save
								</button>
							</Link>
						</Form>
					)}

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
				</Formik>
			</div>
		</div>
	);
}
