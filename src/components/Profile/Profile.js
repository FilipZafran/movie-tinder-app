import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Settings } from '../styleElements/icons/Settings';
import { Link, useLocation } from 'react-router-dom';
import { Star } from '../styleElements/icons';
import { LogoActive } from '../styleElements/icons';
import { ChevronRight } from '../styleElements/icons';
import { dummyData } from '../MatchPage/MatchCard/dummyData';
import Avatar from '../styleElements/avatar/Avatar.js';
// import axios from 'axios';

export function Profile(size) {
	const location = useLocation();

	const likedFilms = [];
	for (let i = 0; i < 3; i++) {
		likedFilms.push(dummyData[i]);
	}

	const topMatches = [];
	for (let i = 4; i < 7; i++) {
		topMatches.push(dummyData[i]);
	}

	const [ posts, setPosts ] = useState([]);

	// useEffect(() => {
	// 	axios
	// 		.get('https://jsonplaceholder.typicode.com/posts')
	// 		.then((res) => {
	// 			console.log(res);
	// 			setPosts(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	// 	useEffect(() => {
	// 		const response = await axios({
	// 			method: 'PUT',
	// 			withCredentials: true,
	// 			url: `${serverURL}/likeTracker/like`,
	// 			data: { film: filmArray[0] },
	// 		});
	// 		console.log(response.data);
	// 		return response.data;
	// 	} catch (err) {
	// 		return err;
	// 	}
	// }

	return (
		<div className='profile__container'>
			<div className='profile__header'>
				<div className='profile__settings'>
					<Link to='/dashboard/ProfileEdit'>
						<Settings className={location.pathname === '/dashboard/ProfileEdit' ? 'activeLogo' : null} />
					</Link>
				</div>

				<p className='profile__logout'>
					{' '}
					<Link to='/'> Logout </Link>
				</p>
			</div>

			<div className='profile__avatar-container'>
				<Avatar />
			</div>

			<div className='profile__name-box'>
				<h2>Linda Bear</h2>
				<h3>
					<LogoActive size={13} />
					&nbsp;26 matches &nbsp; &nbsp;
					<Star size={13} />
					&nbsp;103 likes
				</h3>

				<div className='profile__span-container'>
					<span> “Midlife Crisis”</span>
					<span> Berlin </span>
				</div>

				<h4> Search Catagories:</h4>
				<div className='profile__span-container-big'>
					<span>1970s</span>
					<span>1980s</span>
					<span>Art</span>
					<span>Indy</span>
					<span>Si-Fi</span>
					<span>Western</span>
				</div>
			</div>

			<div id='profile__likes-container'>
				<div className='profile__text-container'>
					<span>Likes</span>
					<p className='profile__show-all'>Show All </p>

					<Link to='/dashboard/LikedMovies'>
						<ChevronRight size={15} active={location.pathname === '/dashboard/LikedMovies'} />
					</Link>
				</div>

				<div className='profile__likes-container'>
					{likedFilms.map((film) => (
						<img className='profile__likes-picture' src={film.image} key={film.id} alt='movie thumbnail' />
					))}
				</div>
			</div>

			<div id='profile__matches-container'>
				<div className='profile__text-container'>
					<span>Top Matches</span>
					<p className='profile__show-all'>Show All </p>
					<Link to='/dashboard/TopMatches'>
						<ChevronRight size={15} active={location.pathname === '/dashboard/TopMatches'} />
					</Link>
				</div>
				<div className='profile__likes-container'>
					{topMatches.map((match) => (
						<img
							className='profile__likes-picture'
							src={match.image}
							key={match.id}
							alt='movie thumbnail'
						/>
					))}
				</div>
			</div>

			<div className='profile__footer'>
				<Link to='/dashboard/users'>
					<div active={location.pathname === '/users'} className='profile__footer-text'>
						<h1>Friends </h1> <ChevronRight />
					</div>
				</Link>

				<hr className='profile__horizontal-line' />

				<div className='profile__footer-text'>
					<h1>My Black List </h1> <ChevronRight />
				</div>
			</div>
		</div>
	);
}
