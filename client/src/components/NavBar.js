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
        setCurrUser({});
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
      {isLoggedIn ? (
        <ul className="points-balance">Balance: {currUser.points} points</ul>
      ) : null}
      <div className="menu-toggle">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/games">Browse Games</Link>
        </li>
        <li className="nav-item">
          <Link to="/library">My Library</Link>
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
        {isLoggedIn ? (
          <li className="nav-item">
            <Link to="/profile" style={{ color: "#ff5722" }}>
              Welcome, {currUser.username}
            </Link>
            <button style={{ textAlign: "center" }} onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
