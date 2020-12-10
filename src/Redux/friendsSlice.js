import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
// import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/userSlice';

const serverUrl = process.env.REACT_APP_SERVER;
const feUrl = process.env.REACT_APP_FE;

const friendsAdapter = createEntityAdapter();
// const initialState = { entities: [], loading: 'idle' };

//initial state of moviesSlice
const initialState = friendsAdapter.getInitialState({
    status: "idle",
    error: null,
});

//Actions
const fetchFriendsWannabes = createAsyncThunk("RECEIVE_FRIENDS_WANNABES",
    async () => {
        const rs = await axios({
            method: 'GET',
            url: `${serverUrl}/friends/wannabes`,
            withCredentials: true,
        })
        console.log("rs in annabees", rs)
        return {
            friendsWannabes: rs.data.wannabes
        }
    }
)

const fetchFriends = createAsyncThunk("RECEIVE_FRIENDS",
    async () => {
        const rs = await axios({
            method: 'GET',
            url: `${serverUrl}/friends/allFriends`,
            withCredentials: true,
        })
        console.log("rs in Friends", rs)
        return {
            friends: rs.data.friends
        }
    }
)

const acceptFriendRequest = createAsyncThunk('ACCEPT_FRIEND_REQUEST',

    async (otherId) => {
        const rs = await axios({
            method: "POST",
            url: `${serverUrl}/friends/accepted/${otherId}`,
            withCredentials: true,
        })
        return {
            friendsWannabes: rs.data,
            otherId
        },
            console.log("ACCEPT_FRIEND_REQUEST", otherId),
            console.log("rs in AcceptFriend", rs, rs.data)
    }
)

const fetchFriendsDeclined = createAsyncThunk('DECLINE_FRIEND_REQUEST',
    async (otherId) => {
        const rs = await axios({
            method: "POST",
            url: `${serverUrl}/friends/declined/${otherId}`,
            withCredentials: true
        })
        return {
            friendsWannabes: rs.data,
            otherId
        }
    })

//Actions
// const fetchFriendsDeleted = createAsyncThunk('DELETE_FRIEND_REQUEST',

//     async () => {
//         const rs = await axios.post(`${serverUrl}/friends/deleted`)
//         // if (rs) {
//         return {
//             type: "DELETE_FRIEND_REQUEST"
//         }
//         // }
//     }

// )

//creates moviesSlice when fetchMovies is fullfilled it will populate the movies slice
const friendsSlice = createSlice({
    name: "friendsList",
    initialState,
    reducers: {
        //here pass the action if not async

    },
    //if async need to crate a thunk 
    extraReducers: {
        [fetchFriendsWannabes.fulfilled]: (state, action) => {
            // console.log("state before", action.type)
            if (action.type === "RECEIVE_FRIENDS_WANNABES/fulfilled") {
                // console.log("made it to action")
                state = {
                    ...state,
                    friendsWannabes: action.payload.friendsWannabes.otherId,

                }
                console.log("state", state)
                // console.log("friends wannabe:", state.sender)
                console.log("state receive", state.otherId)
            }
            return state
        },
        [fetchFriends.fulfilled]: (state, action) => {
            if (action.type === "RECEIVE_FRIENDS/fulfilled") {
                console.log("made it to action")
                state = {
                    ...state,
                    friends: action.payload.friends
                }
                console.log("state in receive friends", state)
            }
            return state
        },
        [acceptFriendRequest.fulfilled]: (state, action) => {
            //miss the otherId should be returned from backend
            console.log("otherId ", acceptFriendRequest.otherId)
            if (action.type === "ACCEPT_FRIEND_REQUEST/fulfilled") {
                state = {
                    ...state,
                    friendsWannabes: state.friendsWannabes.map(friendsWannabe => {
                        console.log("friendswannabe", friendsWannabe)
                        if (action.otherId === friendsWannabe.id) {
                            console.log("state", state)
                            console.log("action.otherId", action.otherId)
                            console.log("friendsWannabe.id", friendsWannabe.id)
                            friendsWannabe.accepted = true;
                            return state;
                        } else {
                            return state;
                        }
                    })
                };
            }
        },


        [fetchFriendsDeclined.fulfilled]: (state, action) => {
            console.log("made it to declined friendslce")
            if (action.type === "DECLINE_FRIEND_REQUEST/fulfilled") {
                state = {
                    ...state,
                    friendsWannabes: state.friendsWannabes.filter(friendsWannabe => {
                        if (action.otherId !== friendsWannabe.id) {
                            return {
                                friendsWannabe
                            };
                        } else {
                            return "There is an issue, we are looking at it";
                        }
                    })
                };
            }
        }
    },
});


export default friendsSlice.reducer;

export {
    fetchFriendsWannabes, acceptFriendRequest, fetchFriendsDeclined, fetchFriends
    // fetchFriendsDeleted 
};

// export const stateWannabes = (state) =>
//     state.friendsWannabes ? state.friendsWannabes : [];
// console.log("state Wannabes", stateWannabes())
// export selectUser = (state) =>
//     state.user ? state.user.entities[0] : null;
//selects all moves from the redux store
//Note: the shape of the redux state is a bit awkward but I'm not sure how to clean this up
// export const selectAllMovies = (state) =>
//     state.movies ? state.movies.entities.undefined.items : [];