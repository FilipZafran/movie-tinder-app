import React, { useState, useEffect } from 'react';
import Friends from './Friends'
import Axios from 'axios';
import '../../index.css'
import './Friends.css'
import { ChevronLeft } from '../styleElements/icons';
import { Link, useLocation } from 'react-router-dom';
import { X } from '../styleElements/icons'
import { Heart } from '../styleElements/icons'


export default function FindPeople() {
    const [errors, setError] = useState(false);
    const [people, setPeople] = useState()
    const [searchPeople, setSearchPeople] = useState()
    const [otherid, setOtherProfileID] = useState('')
    const serverUrl = process.env.REACT_APP_SERVER;
    const feUrl = process.env.REACT_APP_FE;
    const location = useLocation()
    //this GET route should gather the last three registered people 
    useEffect(() => {
        Axios({
            method: "GET",
            url: `${serverUrl}/profiles/users.json`,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data) {
                    setPeople(res.data)
                } else {
                    setError(true)
                }
            });
    }, [])

    //when user looks for friend on an input field, should do a post request 
    useEffect(() => {
        if (searchPeople === undefined) return;
        let ignore = false;
        Axios({
            method: "GET",
            url: `${serverUrl}/profiles/FindPeople/${searchPeople || "d9r3"}`,
            withCredentials: true,
        })

            .then((res) => {
                console.log(res)
                // no match found btw the typed Char and the list of people
                if (res.length === 0) {
                    setPeople(people)
                } else if (!ignore && res.data) {
                    //if match found, should send name, pictures.... to DOM
                    setPeople(res.data)
                } else if (!res.data && !ignore) {
                    //if none of the previous conditions are met, it means there has been an issue somewhere
                    setError(true)
                }
            })
        return () => {
            ignore = true;
        };
    }, [searchPeople])


    const handleChange = e => {
        setSearchPeople(e.target.value)
    }

    const sendPropsParents = e => {
        setOtherProfileID(e.target.id)
    }



    return (
        <React.Fragment>
            <Link to='/dashboard'>
                <div className="Friends__header" active={location.pathname === '/dashboard'} >
                    <ChevronLeft />
                    <h1 className="Friends__title">Friends </h1>
                    <ChevronLeft />
                </div>
            </Link>
            <div className="Friends__searchBar__container">
                <input className="Friends__searchBar" type='text' name='searchFriends' onChange={handleChange} />
                <X />
                {/* <button >Search</button> */}
            </div>
            {people && people.map(person => {
                return (
                    <div className="Friends__LatestRegister" key={person._id}  >

                        {/* <div > */}
                        <img className="Friends__LatestRegisterImg" src="https://wikiclipart.com/wp-content/uploads/2016/11/Monkey-black-and-white-monkey-black-and-white-clip-art-clipart-2.jpg" alt="imagetest"></img>
                        <a className="Friends__TitlePic"
                            href={`${feUrl}/dashboard/user/${person._id}`} name={person._id} target="_blank" otheridtoparents={setOtherProfileID} onClick={sendPropsParents}
                        >
                            <p id={person._id} >{person.username}</p>
                            {/* </div> */}
                        </a>
                        <Heart />
                    </div>
                )
            })}
            { errors && <div> Woops, there was an error loading your search, please try again!</div>}
            <Friends />
        </React.Fragment >
    )


}