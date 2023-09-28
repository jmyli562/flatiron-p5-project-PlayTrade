import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components/css/ReviewList.css";
import ReviewComment from "./ReviewComment";
import { AppContext } from "../context/AppProvider";
import StarRating from "./StarRating";
function ReviewList({ selectedGame }) {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(
    new Array(selectedGame.reviews.length).fill("")
  );
  const { currUser } = useContext(AppContext);
  function handleSubmit(index) {
    const commentContents = commentContent[index];
    console.log(`Comment for review at index ${index}: ${commentContents}`);
  }
  const history = useHistory();
  const buttons = (
    <div className="review-actions">
      <button className="update-review-button">Update Review</button>
      <button className="delete-review-button">Delete Review</button>
    </div>
  );
  const reviews = selectedGame.reviews.map((review, index) => (
    <div key={review.id} className="review">
      <p>Reviewer:{review.user.username}</p>
      <p>Date posted:{review.date_created}</p>
      <StarRating rating={review.rating}></StarRating>
      <p>{review.content}</p>
      {currUser.id === review.user.id ? buttons : null}
      <hr></hr>
      <br></br>
      <h3>Comments:</h3>
      <div className="comment-input">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentContent[index]}
          onChange={(e) => {
            const newCommentContents = [...commentContent];
            newCommentContents[index] = e.target.value;
            setCommentContent(newCommentContents);
          }}
        />
        <button onClick={handleSubmit(index)}>Add Comment</button>
        <br></br>
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
