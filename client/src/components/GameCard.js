import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
import { AppContext } from "../context/AppProvider";
import "../components/css/GameCard.css";
function GameCard({ game, title, image, releaseDate, rating, price }) {
  function checkIfReviewed(selectedGame) {
    for (let i = 0; i < selectedGame.reviews.length; i++) {
      if (selectedGame.reviews[i].user_id === currUser.id) {
        //setSelectedGame({});
        return true;
      } else {
        //selectedGame({});
        return false;
      }
    }
  }
  const history = useHistory();
  const { currUser, selectedGame, setSelectedGame, isLoggedIn } =
    useContext(AppContext);
  function createSlugTitle(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");
  }
  return (
    <div className="game-card">
      {game.hasOwnProperty("background_image") ? null : (
        <span className="game-card-price">Cost: {price} points</span>
      )}
      <img src={image} alt={title} className="game-card-image"></img>
      <h3 className="game-card-title">{title}</h3>
      <span>Released: {releaseDate}</span>
      <StarRating rating={rating}></StarRating>
      {/*reminder to add conditional rendering: if a game has no reviews: render "leave a review"*/}
      {/*/ when user clicks takes them to /game_name/add_review*/}
      {/*if the game already has a review, show See Reviews (1) <- number of reviews and take user to page to leave a comment on the review */}
      {game.hasOwnProperty("background_image") || !isLoggedIn ? null : (
        <span
          className="game-card-span"
          onClick={() => {
            //console.log(currUser);
            setSelectedGame(game);
            const reviewed = checkIfReviewed(game);

            const path = reviewed
              ? `/game/${createSlugTitle(title)}/reviews`
              : `/game/${createSlugTitle(title)}/create-review`;

            history.push(path);
          }}
        >
          {game.reviews.length === 0
            ? "Leave a Review"
            : `Reviews (${game.reviews.length})`}
        </span>
      )}
      <br></br>
      {/*if the user is not logged in gray out the add game to cart button and disable clicking */}
      <button
        className="game-card-button"
        disabled={isLoggedIn ? false : true}
        style={{ backgroundColor: isLoggedIn ? "" : "gray" }}
      >
        Add Game to Cart 🛒
      </button>
    </div>
  );
}

export default GameCard;
