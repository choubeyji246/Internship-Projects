import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import getResponse from "../../utils/GetResponse";
import Input from "../AtomComponents/Input";
import Button from "../AtomComponents/Button";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await getResponse(
        "post",
        "http://localhost:3000/auth/register",
        { name: name, email: email, password: password, address: address }
      );
      alert(response.data.data["message"]);
      navigate("/auth/login");
    } catch (error) {
      alert("Registration failed");
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop:"-20px" }} className="register-form">
        <h1 className="register-head">Register here</h1>
        <form id="registerForm">
          <label htmlFor="name">
            Name:
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              changeEvent={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="email">
            Email:
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              changeEvent={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="password">
            Password:
            <Input
              type="Password"
              id="password"
              name="address"
              value={password}
              changeEvent={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="email">
            Address:
            <Input
              type="text"
              id="address"
              name="address"
              value={address}
              changeEvent={(e) => setAddress(e.target.value)}
            />
          </label>
          <br />
          <br />
        </form>
        <Button text="submit" handleEvent={registerUser} />
      </div>
      <Footer/>
    </>
  );
};

export default Register;
