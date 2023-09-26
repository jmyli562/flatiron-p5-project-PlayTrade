import React from "react";
import "../components/css/GameReview.css";
//if the game does not have a review.... the title will be Leave a Review for {game}
//be sure to include back button to redirect back to /games
//background image will be the game image
function GameReview({ game }) {
  console.log(game);
  return (
    <div className="game-review">
      <h1>Leave a Review for {game.name}</h1>
      <div
        className="background-image"
        style={{ backgroundImage: `url("${game.image_url}")` }}
      ></div>
      <form>
        <div className="rating">
          <label>Rating:</label>
          <input type="number" step="0.5" min="0" max="5" />
        </div>
        <div className="review-text">
          <label>Review:</label>
          <textarea />
        </div>
        <button className="review-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default GameReview;
