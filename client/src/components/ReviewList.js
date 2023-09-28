import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components/css/ReviewList.css";
import ReviewComment from "./ReviewComment";
import { AppContext } from "../context/AppProvider";
import StarRating from "./StarRating";
function ReviewList({ selectedGame }) {
  useEffect(() => {
    fetch("/comments")
      .then((resp) => resp.json())
      .then((comments) => {
        // Filter comments for the selected game's reviews
        const filteredComments = comments.filter((comment) =>
          selectedGame.reviews.some((review) => review.id === comment.review_id)
        );

        // Group comments by review_id
        const commentsByReview = {};
        filteredComments.forEach((comment) => {
          const reviewId = comment.review_id;
          if (!commentsByReview[reviewId]) {
            commentsByReview[reviewId] = [];
          }
          commentsByReview[reviewId].push(comment);
        });

        // Update the state with the filtered and grouped comments
        setComments(commentsByReview);
      });
  }, [selectedGame]);
  const { setSelectedGame } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(
    new Array(selectedGame.reviews.length).fill("")
  );
  const { currUser } = useContext(AppContext);
  const history = useHistory();
  const buttons = (
    <div className="review-actions">
      <button className="update-review-button">Update Review</button>
      <button className="delete-review-button">Delete Review</button>
    </div>
  );
  function handleSubmit(index, review_id) {
    const commentContents = commentContent[index];

    const new_comment = {
      content: commentContents,
      review_id: review_id,
      user_id: currUser.id,
    };

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_comment),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          resp.text().then((errorMessage) => {
            console.log("Error message from server:", errorMessage);
          });
        }
      })
      .then((comment) => {
        const updatedReviews = selectedGame.reviews.map((review) => {
          if (review.id === review_id) {
            return {
              ...review,
              comments: [...(review.comments || []), comment],
            };
          } else {
            return review;
          }
        });
        setSelectedGame({
          ...selectedGame,
          reviews: updatedReviews,
        });
        const newCommentContents = [...commentContent];
        newCommentContents[index] = "";
        setCommentContent(newCommentContents);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        // Handle network errors or other issues
      });
  }
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
      {comments[review.id] &&
        comments[review.id].map((comment, commentIndex) => (
          <div key={commentIndex} className="comment">
            <p>Comment left by: {currUser.username}</p>
            <p>Date posted: {comment.posted_at}</p>
            <p>{comment.content}</p>
          </div>
        ))}
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
        <button onClick={() => handleSubmit(index, review.id)}>
          Add Comment
        </button>
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
