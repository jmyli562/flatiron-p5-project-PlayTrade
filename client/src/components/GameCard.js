import React from "react";
import "../components/css/GameCard.css";
function GameCard({ title, image, releaseDate, rating }) {
  return (
    <div className="game-card">
      <img
        src={image}
        alt={title}
        className="game-card-image"
        width="1000px"
        height="100px"
      ></img>
      <h3 className="game-card-title">{title}</h3>
      <span>Released:{releaseDate}</span>
      <p>Rating: {rating}</p>
      <button className="game-card-button">Buy now</button>
    </div>
  );
}

export default GameCard;
