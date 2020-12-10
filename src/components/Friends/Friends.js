import React, { useState, useEffect } from 'react';
import { fetchFriendsWannabes, fetchFriends, acceptFriendRequest, fetchFriendsDeclined, stateWannabes } from '../../Redux/friendsSlice'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';


export default function Friends() {
	const [visible, setVisible] = useState(false)
	const [friendsVisible, setFriendsVisible] = useState(true)
	const [buttonTitle, setButtonTitle] = useState("Friends requests")
	const [visibleSentReq, setVisibleSentReq] = useState(false)
	const [visibleReceiveReq, setVisibleReceiveReq] = useState(true)
	const dispatch = useDispatch();
	const feUrl = process.env.REACT_APP_FE;


	// console.log("fetch friends Wannabe", useSelector(state => state.friends.friendsWannabes.receiverArray))
	const friendsAccepted = useSelector(
		state => state.friends.friends
	)

	const friendsPendingReceiving = useSelector(
		state => state.friends.sender

	)


	const friendsPendingSending = useSelector(
		state => state.friends.receiver
	)

	// console.log(friendsPending)

	useEffect(() => {
		dispatch(fetchFriendsWannabes())
		dispatch(fetchFriends())
	}, [])

	const toggleModale = (e) => {
		setVisible(!visible)
		setFriendsVisible(!friendsVisible)
		if (e.target.innerHTML === "Friends requests") {
			setButtonTitle("My Friends")
		} else if (e.target.innerHTML === "My Friends") {
			setButtonTitle("Friends requests")
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
			<h2> My Friends</h2>
			<button onClick={e => toggleModale(e)}>{buttonTitle}</button>

			{friendsVisible && <div>
				<h1>I am your friends</h1>
				{friendsAccepted && friendsAccepted.map(friend => {
					console.log(friend)
					return (
						<div>
							<h2 key={friend}> ID {friend} </h2>
							<button onClick={() => dispatch(fetchFriendsDeclined(friend))}> Unfriend</button>
						</div>
					)
				})}
			</div>
			}

			{visible && <div>
				<button name="receiveReq" onClick={e => { togglePendingModal(e) }}>Received Friends Requests</button>

				<button name="sentReq" onClick={e => { togglePendingModal(e) }}>Sent requests</button>
				<h1>I am the requests you received
				</h1>
				{visibleReceiveReq && (<div>
					{friendsPendingReceiving && friendsPendingReceiving.map(friend => {
						console.log("pending friends", friend)
						console.log("window", window)

						return (
							<div>
								<a key={friend} href={`${feUrl}/dashboard/user/${friend}`} target="_blank"> ID{friend}</a>
								<button onClick={() => dispatch(acceptFriendRequest(friend))}>Accept Friend request</button>
								<button onClick={() => dispatch(fetchFriendsDeclined(friend.receiverUserId))}>Reject Friend request</button>
							</div>
						)
					})}
				</div>
				)}

				{visibleSentReq && (<div>
					{friendsPendingSending && friendsPendingSending.map(friend => {
						console.log("pending friends", friend)
						console.log("window", window)

						return (
							<div>
								<a key={friend} href={`${feUrl}/dashboard/user/${friend}`} target="_blank"> ID{friend}</a>

								<button onClick={() => dispatch(fetchFriendsDeclined(friend.receiverUserId))}>Cancel friends request</button>
							</div>
						)
					})}
				</div>
				)}
			</div>
			}
		</React.Fragment>
	)
}



