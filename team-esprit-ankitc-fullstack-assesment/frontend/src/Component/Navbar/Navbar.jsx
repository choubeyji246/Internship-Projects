import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Auth from "../../Auth/Auth";
import Button from "../AtomComponents/Button";
import "./Navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const myOrders = async () => {
    navigate("/auth/myorders");
  };

  return (
    <div className="navbar">
      <nav>
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
          width="160"
          height="40"
          alt="logo"
        />
        {token ? (
          <div className="auth">
            <Link to="/">
              <Button text="Home" handleEvent={() => navigate("/")} />
            </Link>
            <Link to="/auth/myorders">
              <Button text="My orders" handleEvent={myOrders} />
            </Link>
            <Button text="Log Out" handleEvent={handleLogout} />
          </div>
        ) : (
          <Auth />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
