import React, { useState } from "react";
import "../components/css/GameList.css";
import GameCard from "./GameCard";
function GameList({ allgames }) {
  const [titleFilter, setTitleFilter] = useState("");
  const filteredGames = allgames.filter((game) =>
    game.name.toLowerCase().includes(titleFilter.toLowerCase())
  );
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <select>
          <option value="">Sort by</option>
          <option value="rating">Name A-Z</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="game-grid">
        {filteredGames.length == 0 ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            No games were found. Try again.
          </p>
        ) : (
          filteredGames.map((game, index) => (
            <div key={game.id} className="game-card">
              <GameCard
                title={game.name}
                image={game.image_url}
                releaseDate={game.release_date}
                rating={game.rating}
              ></GameCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GameList;
