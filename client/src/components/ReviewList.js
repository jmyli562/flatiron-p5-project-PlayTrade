import React from "react";
import { useHistory } from "react-router-dom";
import "../components/css/ReviewList.css";
import StarRating from "./StarRating";
function ReviewList({ selectedGame }) {
  const history = useHistory();
  const reviews = selectedGame.reviews.map((review) => (
    <div key={review.id} className="review">
      <StarRating rating={review.rating}></StarRating>
      <p>{review.content}</p>

      <div className="comment-input">
        <input type="text" placeholder="Add a comment..." />
        <button>Add Comment</button>
      </div>
    </div>
  ));

  return (
    <div className="review-list">
      <h1>User Reviews for {selectedGame.name}</h1>
      <br></br>
      {selectedGame.reviews.length === 0 ? (
        <div>
          <h3>No Reviews found!</h3>
          <br></br>
          <button
            onClick={() =>
              history.push(
                `/game/${selectedGame.name
                  .toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, "-")}/create-review`
              )
            }
          >
            Create a review
          </button>
        </div>
      ) : (
        reviews
      )}
    </div>
  );
}

export default ReviewList;
