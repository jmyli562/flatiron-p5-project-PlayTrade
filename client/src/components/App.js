import React, { useEffect, useState, useContext } from "react";
import { withRouter, Switch, Route, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import "../components/css/App.css";
function App() {
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
