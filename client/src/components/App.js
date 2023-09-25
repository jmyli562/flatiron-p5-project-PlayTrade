import React, { useEffect, useState, useContext } from "react";
import { withRouter, Switch, Route, useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import "../components/css/App.css";
function App() {
  const { currUser, setCurrUser, isLoggedIn, setLoggedIn } =
    useContext(AppContext);
  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then(
          (user) => setCurrUser(user),
          setLoggedIn(() => !isLoggedIn)
        );
      }
    });
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
