import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../AtomComponents/Input";
import Button from "../AtomComponents/Button";
import getResponse from "../../utils/GetResponse";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await getResponse(
        "post",
        `http://localhost:3000/auth/login`,
        { email: email, password: password }
      );
      localStorage.setItem("token", response.data.data["data"]);
      if (localStorage.getItem("token") != null) {
        alert("login successful");
        navigate("/");
      }
    } catch (error) {
      alert("login failed");
    }
  };
  return (
    <div className="login">
      <Navbar />
      <div
        style={{ textAlign: "center", marginTop: "-20px" }}
        className="login-form"
      >
        <h1>Login</h1>
        <form id="loginForm">
          <label htmlFor="login-email">
            Email:
            <Input
              type="email"
              id="login-email"
              name="login-email"
              value={email}
              changeEvent={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label htmlFor="login-password">
            Password:
            <Input
              type="password"
              id="login-password"
              name="login-password"
              value={password}
              changeEvent={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
        </form>
        <Button text="submit" handleEvent={loginUser} />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
