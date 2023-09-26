import React from "react";
import StarRating from "./StarRating";
import "../components/css/GameCard.css";
function GameCard({ title, image, releaseDate, rating, price }) {
  function createSlugTitle(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");
  }
  return (
    <div className="game-card">
      <span className="game-card-price">Cost: {price} points</span>
      <img src={image} alt={title} className="game-card-image"></img>
      <h3 className="game-card-title">{title}</h3>
      <span>Released: {releaseDate}</span>
      <StarRating rating={rating}></StarRating>
      {/*reminder to add conditional rendering: if a game has no reviews: render "leave a review"*/}
      {/*/ when user clicks takes them to /game_name/add_review*/}
      {/*if the game already has a review, show See Reviews (1) <- number of reviews and take user to page to leave a comment on the review */}
      <a href={"/game/" + createSlugTitle(title) + "/review"}>Leave a review</a>
      <br></br>
      {/*if the user is not logged in gray out the add game to cart button and disable clicking */}
      <button className="game-card-button">Add Game to Cart 🛒</button>
    </div>
  );
}

export default GameCard;
