import React, { useState, setState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import { TopNav } from '../TopNav';
import { Toggle } from '../styleElements/controls/Toggle';
import Avatar from '../styleElements/avatar/Avatar.js';
import { Check } from '../styleElements/icons/Check.js';
import FileUploader from './FileUploader';

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

export function ProfileEdit() {
	const location = useLocation();

	const classes = useStyles();
	const [ value, setValue ] = useState('');

	const handleChange = (e) => setValue(e.target.value);

	// FileUploader > ProfileEdit
	const [ picture, setPicture ] = useState('');

	// callback function
	function setPictureCallback(url) {
		setPicture(url);
	}

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

				<Formik
					initialValues={{ picture: '', username: '', age: '', city: '', email: '', password: '' }}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = 'Invalid email address';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<Form onSubmit={handleSubmit}>
							<div id='profile__edit-picture-container'>
								<Avatar className='profile__avatar' />
							</div>

							<FileUploader
								picture={setPictureCallback}
								type='text'
								name='puicture'
								value={values.picture}
							/>

							<div className='profile__edit-label-input'>
								<label> Username:</label>
								<input
									type='text'
									name='username'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.username}
								/>
							</div>
							<div className='profile__edit-label-input profile__edit__age-select-wrapper'>
								<label> Age Range:</label>

								<Field
									name='age'
									as='select'
									placeholder='Select smth'
									value={values.age}
									as={TextField}
								>
									<option value='Newb'>Younger than 18yo </option>
									<option value='Generation Z'>Between 22 - 30yo </option>
									<option value='Midlife Crisis'>Between 30 - 40yo </option>
								</Field>
							</div>

							<div className='profile__edit-label-input'>
								<label> City: </label>
								<input
									type='text'
									name='city'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.city}
								/>
							</div>

							<div className='profile__edit-label-input'>
								<label> Email: </label>
								<input
									type='email'
									name='email'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email && errors.email}
							</div>

							<div className='profile__edit-label-input'>
								<label> Password: </label>
								<input
									type='password'
									name='password'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								{errors.password && touched.password && errors.password}
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

							<button
								className='profile__bttn'
								// active={location.pathname === '/dashboard/Profile'}
								type='submit'
								disabled={isSubmitting}
							>
								<Check /> &nbsp; Save
							</button>
						</Form>
					)}
				</Formik>

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
