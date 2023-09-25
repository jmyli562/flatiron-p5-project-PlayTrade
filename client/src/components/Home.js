import React from "react";
import "../components/css/Home.css";
function Home() {
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
          <div className="game-card">
            <img src="" alt="Game 1" />
            <h3>Game Title 1</h3>
            <p>Description of Game 1.</p>
            <span className="price">$49.99</span>
            <a href="#" className="buy-button">
              Buy Now
            </a>
          </div>
          <div className="game-card">
            <img src="" alt="Game 2" />
            <h3>Game Title 2</h3>
            <p>Description of Game 2.</p>
            <span className="price">$59.99</span>
            <a href="#" className="buy-button">
              Buy Now
            </a>
          </div>
          {/* Add more featured game cards as needed */}
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Your Video Game Store</p>
      </footer>
    </div>
  );
}

export default Home;
