import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components/css/ReviewList.css";
import CommentList from "./CommentList";
import { AppContext } from "../context/AppProvider";
import { format } from "date-fns";
import StarRating from "./StarRating";
function ReviewList({ selectedGame, allGames, setAllGames }) {
  function handleUpdateReview(e) {
    e.preventDefault();
    fetch(`/reviews/${reviewEditID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newReviewContent,
        rating: newReviewRating,
      }),
    })
      .then((resp) => resp.json())
      .then((patchedReview) => {
        //update the state of the selectedGame and allGames
        // Create a new array with the updated review replacing the old one
        setReviewEditID(null);
        setNewReviewContent("");
        setNewReviewRating("");
        setEditMode(() => !editMode);
      });
  }
  function handleEdit(reviewId, rating, content) {
    setEditMode(() => !editMode);
    setReviewEditID(reviewId);
    setNewReviewContent(content);
    setNewReviewRating(rating);
  }
  function handleDelete(e) {
    //delete the comments on the backend...
    //update the review state and remove the review
    ////the user should only be able to modify their reviews if they are logged in, and the review is their review

    //extracting the review id
    let review_id = parseInt(e.target.parentNode.parentNode.id);
    //we want an array that doesn't have the review that we want to delete, so we can update state with it
    const updatedGame = { ...selectedGame }; //making a copy of the selectedGame
    updatedGame.reviews = updatedGame.reviews.filter(
      (review) => review.id !== review_id
    );
    fetch(`/reviews/${review_id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to delete review");
        }
      })
      .then(() => {
        // Update the selectedGame state with the modified game object
        setSelectedGame(updatedGame);
        //we also need to update the state of allgames and update the state of the review at the specific game
        const updatedGames = allGames.map((game) => {
          // Check if the game has the review to be deleted
          if (game.reviews.some((review) => review.id === review_id)) {
            // Remove the deleted review from the game's reviews
            const updatedReviews = game.reviews.filter(
              (review) => review.id !== review_id
            );
            return {
              ...game,
              reviews: updatedReviews,
            };
          }
          return game;
        });

        // Update the allGames state with the modified game list
        setAllGames(updatedGames);
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        // Handle any errors here
      });
  }
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
  const { setSelectedGame, createSlugTitle } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(false); //toggle for when the user wants to edit their review
  const [reviewEditID, setReviewEditID] = useState(null);
  const [newReviewRating, setNewReviewRating] = useState();
  const [newReviewContent, setNewReviewContent] = useState("");
  const [commentContent, setCommentContent] = useState(
    new Array(selectedGame.reviews.length).fill("")
  );
  const { currUser } = useContext(AppContext);
  const history = useHistory();
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
              comment: [...(review.comments || []), comment],
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
    <div key={review.id} className="review" id={review.id}>
      {/*toggling between showing the review or the edit review view*/}
      {editMode ? (
        <>
          <form onSubmit={(e) => handleUpdateReview(e)}>
            <h3>Editing Your Review</h3>
            <label>
              Rating:
              <input
                type="number"
                step="0.5"
                min="0"
                max="5"
                className="review-rating-input"
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(e.target.value)}
              />
            </label>
            <label>Content:</label>
            <textarea
              className="review-content-textarea"
              value={newReviewContent}
              placeholder="Type new review here..."
              onChange={(e) => setNewReviewContent(e.target.value)}
            />
            <div>
              <button
                className="review-save-changes"
                type="submit"
                value="submit"
              >
                Save Changes
              </button>
              <button
                className="cancel-review-edit"
                onClick={() => setEditMode(!editMode)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <p>Reviewer:{review.user.username}</p>
          <p>Date posted:{review.date_created}</p>
          <StarRating rating={review.rating}></StarRating>
          <p>{review.content}</p>
          {currUser.id === review.user.id ? (
            <>
              <div className="review-actions">
                <button
                  className="update-review-button"
                  onClick={() =>
                    handleEdit(review.id, review.rating, review.content)
                  }
                >
                  Update Review
                </button>
                <button
                  className="delete-review-button"
                  onClick={(e) => handleDelete(e)}
                >
                  Delete Review
                </button>
              </div>
            </>
          ) : null}
        </>
      )}
      <hr></hr>
      <br></br>
      <h3>Comments:</h3>
      {comments[review.id] && <CommentList comments={comments[review.id]} />}
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
                `/game/${createSlugTitle(selectedGame.name)}/create-review`
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
                  `/game/${createSlugTitle(selectedGame.name)}/create-review`
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
