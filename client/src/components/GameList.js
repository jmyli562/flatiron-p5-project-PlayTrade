import React, { useState } from "react";
import "../components/css/GameList.css";
import GameCard from "./GameCard";
function GameList({ allgames }) {
  console.log(allgames);
  const [titleFilter, setTitleFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const filteredGames = allgames.filter((game) =>
    game.name.toLowerCase().includes(titleFilter.toLowerCase())
  );
  filteredGames.sort((a, b) => {
    if (sortFilter === "AtoZ") {
      return a.name.localeCompare(b.name);
    } else if (sortFilter === "ZtoA") {
      return b.name.localeCompare(a.name);
    } else if (sortFilter === "rating") {
      return b.rating - a.rating;
    } else if (sortFilter === "releaseDate") {
      return new Date(b.release_date) - new Date(a.release_date);
    } else {
      return 0;
    }
  });
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title... 🔍"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <select
          value={sortFilter}
          onChange={(e) => setSortFilter(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="AtoZ">Name A-Z</option>
          <option value="ZtoA">Name Z-A</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="game-grid">
        {filteredGames.length === 0 ? (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            No games were found. Try again.
          </p>
        ) : (
          filteredGames.map((game, index) => (
            <div key={game.id} className="game-card">
              <GameCard
                game={game}
                title={game.name}
                image={game.image_url}
                releaseDate={game.release_date}
                rating={game.rating}
                price={game.price}
              ></GameCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GameList;
