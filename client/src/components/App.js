import React, { useEffect, useState, useContext } from "react";
import { withRouter, Switch, Route, useHistory } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
