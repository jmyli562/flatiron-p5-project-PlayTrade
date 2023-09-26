import React, { useEffect, useState, useContext } from "react";
import { withRouter, Switch, Route, useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import GameList from "./GameList";
import "../components/css/App.css";
function App() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const { currUser, setCurrUser, isLoggedIn, setLoggedIn } =
    useContext(AppContext);
  /*
  function addGamesToDatabase(games) {
    for (let i = 0; i < games.length; i++) {
      fetch("/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(games[i]),
      });
    }
  }
  */
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
  useEffect(() => {
    async function getVideoGames() {
      await fetch(
        `https://rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page=1&page_size=10`
      )
        .then((resp) => resp.json())
        .then((data) => {
          const tempArr = [];
          data.results.map((gameData) => {
            tempArr.push(gameData);
          });
          setFeaturedGames(tempArr);
          //addGamesToDatabase(tempArr);
        });
    }
    getVideoGames();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/">
          <Home games={featuredGames} />
        </Route>
        <Route exact path="/home">
          <Home games={featuredGames} />
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
      <Switch>
        <Route exact path="/games">
          <GameList />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
