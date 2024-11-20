import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Correct path to the CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">Login</Link>
      <Link to="/configurator" className="navbar-link">Car Configurator</Link>
    </div>
  );
};

export default Navbar;
