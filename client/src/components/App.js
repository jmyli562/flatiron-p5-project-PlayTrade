import React, { useEffect, useState, useContext } from "react";
import { withRouter, Switch, Route, useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import Register from "./Register";
import ReviewList from "./ReviewList";
import ShoppingCart from "./ShoppingCart";
import GameLibrary from "./GameLibrary";
import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import GameList from "./GameList";
import GameReview from "./GameReview";
import "../components/css/App.css";
import OrderSuccess from "./OrderSuccess";
function App() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const { currUser, setCurrUser, isLoggedIn, setLoggedIn, selectedGame } =
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
    async function getFeaturedGames() {
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
    async function getAllGames() {
      await fetch("/games").then((response) => {
        if (response.ok) {
          response.json().then((games) => {
            setAllGames(games);
          });
        }
      });
    }
    getFeaturedGames();
    getAllGames();
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
          <GameList allgames={allGames} />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/game/:game/create-review">
          <GameReview
            allGames={allGames}
            setAllGames={setAllGames}
            currUser={currUser}
            game={selectedGame}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/game/:game/reviews">
          <ReviewList
            selectedGame={selectedGame}
            allGames={allGames}
            setAllGames={setAllGames}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/cart">
          <ShoppingCart></ShoppingCart>
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/order/success">
          <OrderSuccess></OrderSuccess>
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/library">
          <GameLibrary />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/profile">
          <Profile user={currUser} updateCurrUser={setCurrUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
