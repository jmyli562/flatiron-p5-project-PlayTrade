import React from "react";
import "../components/css/GameCard.css";
function GameCard({ title, image, releaseDate, rating }) {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-card-image"></img>
      <h3 className="game-card-title">{title}</h3>
      <span></span>
      <button className="game-card-button">Buy now</button>
    </div>
  );
}

export default GameCard;
