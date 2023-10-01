import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../components/css/NavBar.css";
import { AppContext } from "../context/AppProvider";
function NavBar() {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        setLoggedIn(() => !isLoggedIn);
        history.push("/home");
      }
    });
  }
  const { currUser, setCurrUser, isLoggedIn, setLoggedIn, shoppingCart } =
    useContext(AppContext);
  const history = useHistory();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PlayTrade</Link>
        <img src="https://github.com/jmyli562/flatiron-p5-project-PlayTrade/assets/60550632/135821c8-47e1-4ab0-b8b2-8a1f2f31fea2"></img>
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
            {shoppingCart.length === 0 ? (
              <Link to="/cart">Shopping Cart</Link>
            ) : (
              <Link to="/cart">Cart ({shoppingCart.length} items)</Link>
            )}
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/register">Login/Signup</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li className="nav-item">
            <Link to="/profile" style={{ color: "#ff5722" }}>
              Welcome, {currUser.username} 👤
            </Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
