import React from "react";
import "../components/css/Home.css";
import GameCard from "./GameCard";
function Home({ games }) {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Welcome to Your Video Game Store</h1>
          <p>Discover, buy, and play the latest video games!</p>
          <a href="#" className="cta-button">
            Explore Games
          </a>
        </section>
        <section className="featured-games">
          <h2>Featured Games</h2>
          <div>
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.name}
                image={game.background_image}
                releaseDate={game.released}
                rating={game.rating}
              />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Your Video Game Store</p>
      </footer>
    </div>
  );
}

export default Home;
