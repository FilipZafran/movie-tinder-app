import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const history = useHistory();

  function login() {
    localStorage.setItem("isAuthenticated", true);
    history.replace("/dashboard");
  }

  return (
    <div className="container">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="wrappper">
        <h1>Login Page</h1>

        <label> user name </label>
        <input type="text" />

        <label> password </label>
        <input type="text" />

        <button className="button" onClick={login}>
          {" "}
          Login{" "}
        </button>
      </div>
    </div>
  );
}
