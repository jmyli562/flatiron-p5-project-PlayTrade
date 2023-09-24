import React from "react";
import { Link } from "react-router-dom";
import "/home/vlijimmy/Development/code/phase-5/flatiron-p5-project-PlayTrade/client/src/css/NavBar.css";
function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Game Emporium</Link>
      </div>
      <div className="menu-toggle">
        {/* Add a button or icon to toggle the mobile menu */}
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home">Home</Link>
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
