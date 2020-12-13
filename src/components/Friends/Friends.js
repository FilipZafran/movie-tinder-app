import React, { useState, useEffect } from 'react';
import { fetchFriendsWannabes, fetchFriends, acceptFriendRequest, declineFriendRequest, stateWannabes } from '../../Redux/friendsSlice'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import './Friends.css'


export default function Friends() {
	const [visible, setVisible] = useState(false)
	const [friendsVisible, setFriendsVisible] = useState(true)
	const [buttonTitle, setButtonTitle] = useState("See friends requests")
	const [visibleSentReq, setVisibleSentReq] = useState(false)
	const [visibleReceiveReq, setVisibleReceiveReq] = useState(true)
	const dispatch = useDispatch();
	const feUrl = process.env.REACT_APP_FE;

	const friendsAccepted = useSelector(
		state => state.friends.friends
	)

	console.log(friendsAccepted)

	const friendsPending = useSelector(
		state => state.friends.friendsWannabes

	)




	useEffect(() => {
		dispatch(fetchFriendsWannabes())
		dispatch(fetchFriends())
		dispatch(declineFriendRequest())
		// dispatch(friendsState())
	}, [])

	const toggleModale = (e) => {
		setVisible(!visible)
		setFriendsVisible(!friendsVisible)
		if (e.target.innerHTML === "See friends requests") {
			setButtonTitle("See my Friends")
		} else if (e.target.innerHTML === "See my Friends") {
			setButtonTitle("See friends requests")
		}

	}

	const togglePendingModal = (e) => {
		if (e.target.name === "receiveReq") {
			setVisibleReceiveReq(true)
			setVisibleSentReq(false)
		} else if (e.target.name === "sentReq") {
			setVisibleSentReq(true)
			setVisibleReceiveReq(false)

		}



	}

	return (
		<React.Fragment>
			<h1 class="Friends__YourFriends"> My Friends</h1>
			<button class="Friends__button" onClick={e => toggleModale(e)}>{buttonTitle}</button>
			<div class="Friends__list">
				{friendsVisible && <div >
					{/* <h1 class="Friends__YourFriends" >Your friends!</h1> */}
					{friendsAccepted && friendsAccepted.map(friend => {
						return (
							<div class="Friends__card">
								<h3 key={friend}> ID {friend} </h3>
								<button class="Friends__button__unfriend" onClick={() => dispatch(declineFriendRequest(friend))}> Unfriend</button>
							</div>
						)
					})}
				</div>
				}
			</div>

			{visible && <div>
				{/* <button name="receiveReq" onClick={e => { togglePendingModal(e) }}>Received See friends Requests</button>

				<button name="sentReq" onClick={e => { togglePendingModal(e) }}>Sent requests</button>
				<h1>I am the requests you received
				</h1> */}
				{/* {visibleReceiveReq && (<div> */}
				{friendsPending && friendsPending.map(friend => {
					console.log("pending friends", friend)
					console.log("window", window)

					return (
						<div>
							<a key={friend} href={`${feUrl}/dashboard/user/${friend}`} target="_blank"> ID{friend}</a>
							<button onClick={() => dispatch(acceptFriendRequest(friend))}>Accept Friend request</button>
							<button onClick={() => dispatch(declineFriendRequest(friend))}>Reject Friend request</button>
						</div>
					)
				})}
			</div>
			}

			<div id="rest"></div>
		</React.Fragment >
	)
}



