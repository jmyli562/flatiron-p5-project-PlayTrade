import React from "react";
import "../components/css/StarRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

function StarRating({ rating }) {
  // Round the rating down to the nearest half star
  const roundedRating = Math.round(rating * 2) / 2;
  const maxStars = 5;
  const stars = [];
  //adding all the filled whole stars to the stars array
  let i = roundedRating;
  for (i; i >= 1; i--) {
    stars.push(
      <FontAwesomeIcon icon={faStar} key={uuidv4()} className="filled-star" />
    );
  }

  //if there exists a half star append it
  if (i == 0.5) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarHalfAlt}
        key={uuidv4()}
        className="half-star"
      />
    );
  }
  //filling in the empty stars
  for (let i = maxStars - roundedRating; i >= 1; i--) {
    stars.push(
      <FontAwesomeIcon icon={faStar} key={uuidv4()} className="empty-star" />
    );
  }

  return (
    <div className="star-rating">
      <p>{stars}</p>
      <p>{rating}</p>
    </div>
  );
}

export default StarRating;
