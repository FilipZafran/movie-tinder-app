import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      url: "http://localhost:5000/authenticate/login",
    }).then((res) => {
      if (res.data === "Successfully Authenticated") {
        setUsername("");
        setPassword("");
        localStorage.setItem("isAuthenticated", true);
        history.replace("/dashboard");
      }
    });
  }

  return (
    <div className="login">
      <h1>Login Page</h1>
      <label> user name </label>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label> password </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={login}> Login </button>
    </div>
  );
}
