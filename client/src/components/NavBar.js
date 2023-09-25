import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../components/css/NavBar.css";
import { AppContext } from "../context/AppProvider";
function NavBar() {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        setCurrUser({ username: "" });
        setLoggedIn(() => !isLoggedIn);
      }
    });
  }
  const { currUser, setCurrUser, isLoggedIn, setLoggedIn } =
    useContext(AppContext);
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
        {isLoggedIn ? (
          <li className="nav-item">
            <Link to="/profile" style={{ color: "purple" }}>
              Welcome, {currUser.username}
            </Link>
            <button style={{ "text-align": "center" }} onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : null}
        <li className="nav-item">
          <Link to="/home">Homepage</Link>
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
        {isLoggedIn ? (
          <li className="nav-item">
            <Link to="/cart">Shopping Cart</Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/register">Login/Signup</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
