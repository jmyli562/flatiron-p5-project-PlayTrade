import React from "react";
import { Link } from "react-router-dom";
import "../components/css/NavBar.css";
function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">PlayTrade</Link>
      </div>
      <div className="menu-toggle">
        {/* Add a button or icon to toggle the mobile menu */}
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home">HomePage</Link>
        </li>
        <li className="nav-item">
          <Link to="/register">Login/Signup</Link>
        </li>
        <li className="nav-item">
          <Link to="/browse">Browse Games</Link>
        </li>
        <li className="nav-item">
          <Link to="/library">My Library</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
