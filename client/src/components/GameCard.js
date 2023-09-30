import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
import { AppContext } from "../context/AppProvider";
import "../components/css/GameCard.css";
function GameCard({ game, title, image, releaseDate, rating, price }) {
  function addGameToCart(game) {
    //need to check if the game already exists in the cart
    if (shoppingCart.includes(game)) {
      window.alert("Game is already in your cart.");
    } else {
      setShoppingCart(() => [...shoppingCart, game]);
      window.alert(`${game.name} has been added to your cart.`);
    }
  }
  const history = useHistory();
  const {
    currUser,
    setSelectedGame,
    isLoggedIn,
    createSlugTitle,
    shoppingCart,
    setShoppingCart,
  } = useContext(AppContext);
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
            history.push(`/game/${createSlugTitle(title)}/reviews`);
          }}
        >
          {game.reviews.length === 0
            ? "Leave a Review"
            : `Reviews (${game.reviews.length})`}
        </span>
      )}
      <br></br>
      {/*if the user is not logged in gray out the add game to cart button and disable clicking */}
      {/*if the game is already in the cart, do not allow the user to add the game again... disable the button*/}
      {/*do not let the user add a game to the cart if the game is already in their cart */}
      {isLoggedIn && currUser.library.some((game) => game.name === title) ? (
        <button className="game-card-button" disabled="true">
          Already owned
        </button>
      ) : (
        <button
          className="game-card-button"
          disabled={isLoggedIn ? false : true}
          style={{ backgroundColor: isLoggedIn ? "" : "gray" }}
          onClick={() => addGameToCart(game)}
        >
          Add Game to Cart 🛒
        </button>
      )}
    </div>
  );
}

export default GameCard;
