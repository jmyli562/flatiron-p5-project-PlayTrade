import React from "react";

//if the game does not have a review.... the title will be Leave a Review for {game}
//be sure to include back button to redirect back to /games
//background image will be the game image
function GameReview({ game }) {
  return (
    <div>
      <h1>Leave a Review for game</h1>
      <form>
        <label></label>
        <input type="text" placeholder="Leave a review..."></input>
        <button>Create Review</button>
      </form>
    </div>
  );
}

export default GameReview;
