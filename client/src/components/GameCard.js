import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
import { AppContext } from "../context/AppProvider";
import "../components/css/GameCard.css";
function GameCard({ game, title, image, releaseDate, rating, price }) {
  const history = useHistory();
  const { setSelectedGame, isLoggedIn } = useContext(AppContext);
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
            setSelectedGame(game);
            history.push(`/game/${createSlugTitle(title)}/review`);
          }}
        >
          Leave a Review
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
