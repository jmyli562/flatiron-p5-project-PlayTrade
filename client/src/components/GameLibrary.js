import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import "../components/css/GameLibrary.css";
function GameLibrary() {
  const { currUser } = useContext(AppContext);
  return (
    <div className="library-container">
      <div className="game-library">
        <h2>Your Game Library</h2>
        <div className="game-list">
          {currUser.library.map((game) => (
            <div key={game.id} className="library-game">
              <img src={game.image_url} alt={game.name} />
              <div className="game-info">
                <h3>{game.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameLibrary;
