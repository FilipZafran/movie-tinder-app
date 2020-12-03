import React, { useState, useEffect } from 'react';
import { fetchFriendsWannabes, fetchFriendsAccepted, fetchFriendsDeclined, stateWannabes } from '../../Redux/friendsSlice'
import { useDispatch, useSelector } from "react-redux";

export default function Friends() {
	const [visible, setVisible] = useState(false)
	const [friendsVisible, setFriendsVisible] = useState(true)
	const [buttonTitle, setButtonTitle] = useState("Friends requests")
	const dispatch = useDispatch();
	const friendsAccepted = useSelector(
		state => state.friends.friendsWannabes && state.friends.friendsWannabes.filter(
			friendsWannabe => friendsWannabe.accepted == true
		))

	const friendsPending = useSelector(
		state => state.friends.friendsWannabes && state.friends.friendsWannabes.filter(
			friendsWannabe => friendsWannabe.accepted == false
		)
	)

	useEffect(() => {
		dispatch(fetchFriendsWannabes())
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


	return (
		<React.Fragment>
			<h3> Friends</h3>
			<button onClick={e => toggleModale(e)}>{buttonTitle}</button>

			{friendsVisible && <div>
				<h1>I am your friends</h1>
				{friendsAccepted && friendsAccepted.map(friend => {
					console.log(friend)
					return (
						<div>
							<h2 key={friend.receiverUserId}> ID {friend.receiverUserId} </h2>
							<button onClick={() => dispatch(fetchFriendsDeclined(friend.receiverUserId))}> Unfriend</button>
						</div>
					)
				})}
			</div>
			}

			{visible && <div>
				<h1>I am your pending Friends</h1>
				{friendsPending && friendsPending.map(friend => {
					console.log("pending friends", friend)
					console.log("window", window)

					return (
						<div>
							<a key={friend.receiverUserId}>  ID{friend.receiverUserId}</a>
							<button onClick={() => dispatch(fetchFriendsAccepted(friend.receiverUserId))}>Accept Friend request</button>
							<button onClick={() => dispatch(fetchFriendsDeclined(friend.receiverUserId))}>Reject Friend request</button>
						</div>
					)
				})}
			</div>
			}
		</React.Fragment>
	)
}



