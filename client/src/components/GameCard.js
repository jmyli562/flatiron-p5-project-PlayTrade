import React from "react";
import StarRating from "./StarRating";
import Modal from "./Modal";
import "../components/css/GameCard.css";
function GameCard({ title, image, releaseDate, rating }) {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-card-image"></img>
      <h3 className="game-card-title">{title}</h3>
      <span>Released:{releaseDate}</span>
      <StarRating rating={rating}></StarRating>
      <br></br>
      <button className="game-card-button">View more details</button>
    </div>
  );
}

export default GameCard;
