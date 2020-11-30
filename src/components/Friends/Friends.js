import React, { useState, useEffect } from 'react';
import { fetchFriendsWannabes, fetchFriendsAccepted, fetchFriendsDeclined, stateWannabes } from '../../Redux/friendsSlice'
import { useDispatch, useSelector } from "react-redux";
// import {}

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
	// console.log("state", (state => state.friendsWannabes && state.friendsWannabes.filter(
	// 	friendsWannabe => friendsWannabe.accepted == true)))
	// );

	// console.log("stateWannabes ", stateWannabes)
	// console.log("fetchFriendsWannabes", fetchFriendsWannabes)
	// )

	console.log("friendsaccepted", friendsAccepted)

	// const [friendsWannabes, setFriendsWannabes] = useState();
	// const [friendsAccepted, setFriendsAccepted] = useState();
	// const [friendsDeclined, setFriendsDeclined] = useState();
	// const [friendsDelete, setFriendsDelete] = useState();



	useEffect(() => {
		dispatch(fetchFriendsWannabes())

	}, [])

	const toggleModale = (e) => {
		console.log(e)
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
					console.log("friendAccepted", friendsAccepted)
					// if (friend.receiverUserId === )
					return (
						<h2> ID {friend.receiverUserId} </h2>
					)
				})}
			</div>
			}

			{visible && <div>
				<h1>I am your pending Friends</h1>
				{friendsPending && friendsPending.map(friend => {
					console.log("friendsPending", friend.senderUserId)
					return (
						<div>
							<a>  ID{friend.receiverUserId}</a>
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



