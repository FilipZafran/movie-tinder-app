import React, { useState } from 'react';
import axios from 'axios';
import './ResetPw.css';
// import Login from './Login';
import { Link } from 'react-router-dom';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import { Logo } from '../styleElements/icons/Logo';

export default function Resetpw(e) {
	const [ values, setValue ] = useState('');
	const [ step, setSteps ] = useState(0);
	// const [code, setCode] = useState('');
	const [ error, setError ] = useState();

	const submitEmail = () => {
		//send the email to db for confirmation that there is a match
		// need to send email to the recovery email (ses with amazon)
		// need to compare if the code that is entereed from the email is matching the one currently set up in the db => meaning that the db needs to be updated with the new code

		axios
			.post('/password/reset/start"', {
				email: values.email
			})
			.then(({ data }) => {
				// return sucess from db as response to move to next steps of the confirmation
				if (data.success) {
					setSteps({
						step: 1
					});
				} else {
					setError(true);
				}
			});
	};

	const submitCode = () => {
		axios
			.post('/password/reset/verify', {
				email: values.email,
				code: values.code,
				newCode: values.newcode
			})
			.then(({ data }) => {
				if (data.success) {
					setSteps({
						step: 2
					});
				} else {
					setError(true);
				}
			});
	};

	const handleChange = (e) => {
		setValue({
			...values,
			[e.target.name]: e.target.value
		});
	};

	const getCurrentDisplay = () => {
		if (step === 0) {
			return (
				<React.Fragment>
					{error && <div>Woops, there was an issue with the email!</div>}
					{/* Maybe a key should be added but it causes an issue into making the data email travel up to submitEmail() */}
					<input
						input='true'
						type='email'
						name='email'
						placeholder='Please enter your email'
						onInput={(e) => setValue(e.target.value)}
						onChange={handleChange}
					/>
					<button onClick={submitEmail}> Next </button>
				</React.Fragment>
			);
		} else if (Object.values(step)[0] === 1) {
			return (
				<React.Fragment>
					{error && <div>Woops, there was an issue with code/ password!</div>}
					<input
						key='secret-code'
						type='password'
						name='code'
						placeholder='Please enter the code you received'
						onInput={(e) => setValue(e.target.value)}
						onChange={handleChange}
					/>
					<input
						key='newpassword'
						type='password'
						name='newcode'
						placeholder='Please enter your new PW'
						onInput={(e) => setValue(e.target.value)}
						onChange={handleChange}
					/>
					<button onClick={submitCode}> Next </button>
				</React.Fragment>
			);
		} else if (Object.values(step)[0] === 2) {
			return (
				<React.Fragment>
					<p>Successfully updated</p>
					<Link to='/login'>Login</Link>
				</React.Fragment>
			);
		}
	};

	return (
		<React.Fragment>
			<div className='resetPw__container'>
				<CirclesBackground />
				<div className='resetPw__logo'>
					<Logo />
				</div>
				<p>Password Reset</p>
				<h1>
					Please enter the email address associated with your account and we'll send you a link to reset your
					password.<br />
				</h1>

				<input
					className='resetPw__input'
					input='true'
					type='email'
					name='email'
					placeholder='Please enter your email'
					onInput={(e) => setValue(e.target.value)}
					onChange={handleChange}
				/>

				<button className='login__bttn' onClick={submitEmail}>
					{' '}
					Reset{' '}
				</button>

				<h1>Don't have an account? Sign up</h1>
			</div>

			{/* {getCurrentDisplay()} */}
		</React.Fragment>
	);
}
