import React, { useContext } from "react";
import "../components/css/GameReview.css";
import { useFormik } from "formik";
import { AppContext } from "../context/AppProvider";
import { useHistory } from "react-router-dom";
//if the game does not have a review.... the title will be Leave a Review for {game}
//be sure to include back button to redirect back to /games
//background image will be the game image
//if the user is not logged in currently, do not allow to create a review, check isLoggedIn state
function GameReview({ allGames, setAllGames, currUser, game }) {
  const history = useHistory();
  const { setCurrUser } = useContext(AppContext);
  function updateGameReview(review) {
    const updatedgames = allGames.map((game) => {
      if (game.id === review.game_id) {
        const updatedGame = {
          ...game,
          reviews: [...game.reviews, review],
        };
        return updatedGame;
      } else {
        return game;
      }
    });
    setAllGames(updatedgames);
  }
  function updatePoints() {
    let num_points = currUser.points + 10;
    currUser.points = num_points;
    setCurrUser({ ...currUser });
    //we need to update the users points on the backend
    fetch(`/users/${currUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points: currUser.points,
      }),
    });
  }
  const formik = useFormik({
    initialValues: {
      rating: 0,
      content: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.rating) {
        errors.rating = "Rating must not be blank.";
      }
      if (!values.content) {
        errors.content = "Review must not be blank";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      values.user_id = currUser.id;
      values.game_id = game.id;
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((resp) => {
          if (resp.ok) {
            //update the points of the current user by 10
            //update review state for the game
            updateGameReview(values);
            updatePoints();
            resetForm({ values: "" });
            history.push("/games");
          } else {
            resp.text().then((errorMessage) => {
              console.log("Error message from server:", errorMessage);
            });
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // Handle network errors or other issues
        });
    },
  });
  return (
    <div className="game-review">
      <h1>Leave a Review for {game.name}</h1>
      <div
        className="background-image"
        style={{ backgroundImage: `url("${game.image_url}")` }}
      ></div>
      <form onSubmit={formik.handleSubmit}>
        <div className="rating">
          <label>Rating:</label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="5"
            id="rating"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.rating && formik.errors.rating ? (
          <div className="error">{formik.errors.rating}</div>
        ) : null}
        <div className="review-text">
          <label>Review:</label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="error">{formik.errors.content}</div>
          ) : null}
        </div>
        <button type="submit" className="review-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default GameReview;
