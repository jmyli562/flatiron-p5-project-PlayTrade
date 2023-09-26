import React from "react";
import "../components/css/StarRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function StarRating({ rating }) {
  const stars = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} className="filled-star" />
      );
    } else if (i - 0.5 === rating) {
      stars.push(
        <FontAwesomeIcon icon={faStarHalfAlt} key={i} className="half-star" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} className="empty-star" />
      );
    }
  }

  return <div className="star-rating">Rating: {stars}</div>;
}

export default StarRating;
