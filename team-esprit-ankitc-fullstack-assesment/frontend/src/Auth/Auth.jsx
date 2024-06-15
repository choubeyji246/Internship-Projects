import React from "react";

import Button from "../Component/AtomComponents/Button";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Link to="/">
        <Button text="Home" />
      </Link>
      <Link to="/auth/login">
        <Button text="Login" />
      </Link>
      <Link to="/auth/register">
        <Button text="Sign Up" />
      </Link>
    </div>
  );
};

export default Auth;
