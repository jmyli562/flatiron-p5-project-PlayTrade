import React from "react";
import "../components/css/GameList.css";
import GameCard from "./GameCard";
function GameList({ allgames }) {
  return (
    <div>
      <h2 className="game-list-header">Search for a Game</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search by title" />
        <select>
          <option value="">Sort by</option>
          <option value="rating">Name A-Z</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="game-grid">
        {allgames.map((game, index) => (
          <div key={game.id} className="game-card">
            <GameCard
              title={game.name}
              image={game.image_url}
              releaseDate={game.release_date}
              rating={game.rating}
            ></GameCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameList;
