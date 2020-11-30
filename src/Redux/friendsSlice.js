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
    // id:
    status: "idle",
    error: null,
});

// const user = useSelector(selectUser)

//async thunk that will fetch the top 250 movies list from IMDB and store them
//in the "movies" section of the redux state
// export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
//     const response = await axios.get(
//         `https://imdb-api.com/en/API/Top250Movies/${process.env.REACT_APP_IMDB_KEY}`
//     );
//     return response;
// });

//Actions
const fetchFriendsWannabes = createAsyncThunk("RECEIVE_FRIENDS_WANNABES",
    async () => {
        const rs = await axios({
            method: 'GET',
            url: `${serverUrl}/friends/wannabe`,
            withCredentials: true,
        })
        // console.log("rs in friendsslice", rs.data)
        // console.log("rs.payload", rs.payload)
        // if (rs) {
        console.log(rs.data)
        console.log(rs)
        return {
            friendsWannabes: rs.data
        }
        // }
    }
)

const fetchFriendsAccepted = createAsyncThunk('ACCEPT_FRIEND_REQUEST',
    // const otherId = 
    async (otherId) => {
        console.log("otherId in accept friends", otherId)
        const rs = await axios({
            method: "POST",
            url: `${serverUrl}/friends/accepted/${otherId}`,
            withCredentials: true,

        })
        // if (rs) {
        console.log("rs in accepte firends", rs)
        return {
            friendsWannabes: rs.data,
            otherId
        }
        // }
    }

)

const fetchFriendsDeclined = createAsyncThunk('DECLINE_FRIEND_REQUEST',
    async (otherId) => {
        console.log("userid in friendsdecline", otherId)

        const rs = await axios({
            method: "POST",
            url: `${serverUrl}/friends/declined/${otherId}`,
            withCredentials: true
        })
        // if (rs) {}
        console.log("rs in delete friends", rs)
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
                    friendsWannabes: action.payload.friendsWannabes
                }
                console.log("state", state)
            }
            return state
        },


        [fetchFriendsAccepted.fulfilled]: (state, action) => {
            console.log("otherId ", fetchFriendsAccepted.otherId)
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
        }

        // reduce: (state, action) => {
        //     if (action.type === "RECEIVE_FRIENDS_WANNABES/fulfilled") {
        //         console.log("made it to action")
        //         state = {
        //             ...state,
        //             friendsWannabes: action.payload.friendsWannabes
        //         }
        //         console.log("state", state)
        //     } else if (action.type === "ACCEPT_FRIEND_REQUEST/fulfilled") {
        //         console.log("made it to accept")

        //     }


        //     return state
        // }
    },

});


export default friendsSlice.reducer;

export {
    fetchFriendsWannabes, fetchFriendsAccepted, fetchFriendsDeclined,
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