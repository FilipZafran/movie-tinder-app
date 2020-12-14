import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import Registration from '../UserPathLog/Register';
// import Resetpw from '../UserPathLog/Resetpw';
import { Link } from "react-router-dom";
import "./Login.css";
import { Logo } from "../styleElements/icons/Logo";

import { UnderConstruction } from "../UnderConstruction";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER;

  const history = useHistory();

  //this could be changed to an async function
  //this verification route will work if you run the server from index.js on your local machine
  //currently the credentials username:Admin password:password will work
  //a registration route is set up under POST "http://localhost:5000/authentication/register" (also accepts username and pw)
  function login() {
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: `${serverUrl}/authenticate/login`,
    }).then((res) => {
      if (res.data.message === "Successfully Authenticated") {
        setUsername("");
        setPassword("");
        localStorage.setItem("isAuthenticated", true);
        history.replace("/dashboard");
      }
    });
  }

  // const hide = () => {
  // 	if (!'http://localhost:3000/') {
  // 		console.log("url changed")

  // 	}
  // }

  return (
    <React.Fragment>
      <div className="login">
        <Logo />

        <h1>Welcome</h1>

        <input
          className="input-field"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <input
          className="input-field"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={login}> Login </button>
      </div>
      <div className="links-container">
        <Link to="/register">Register</Link>
        <Link to="/resetpw"> Reset PW</Link>
      </div>
    </React.Fragment>
  );
}
