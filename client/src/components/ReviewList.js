import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../components/css/ReviewList.css";
import { AppContext } from "../context/AppProvider";
import StarRating from "./StarRating";
function ReviewList({ selectedGame }) {
  const { currUser } = useContext(AppContext);
  console.log(selectedGame);
  const history = useHistory();
  const reviews = selectedGame.reviews.map((review) => (
    <div key={review.id} className="review">
      <p>Reviewer:{review.user.username}</p>
      <p>Date posted:{review.date_created}</p>
      <StarRating rating={review.rating}></StarRating>
      <p>{review.content}</p>
      {currUser.id === review.user.id ? <a href="/">Update Review</a> : null}
      <div className="comment-input">
        <input type="text" placeholder="Add a comment..." />
        <button>Add Comment</button>
      </div>
      <br></br>
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
        <div>
          {reviews}
          {!selectedGame.reviews.some(
            (review) => review.user.id === currUser.id
          ) ? (
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
              Leave a review!
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default ReviewList;
