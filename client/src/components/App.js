import React, { useEffect, useState, useContext } from "react";
import { withRouter, Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import NavBar from "./NavBar";
import "../components/css/App.css";
function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/register">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
