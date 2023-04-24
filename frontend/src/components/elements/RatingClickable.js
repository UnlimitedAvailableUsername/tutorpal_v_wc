import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStarRegular } from '@fortawesome/free-regular-svg-icons';

function RatingClickable({ text, color, setRating }) {
  const [currentRating, setCurrentRating] = useState(0);

  const handleStarClick = (rating) => {
    setCurrentRating(rating);
    setRating(rating);
  };

  return (
    <div className='rating' >
      <span>
        <FontAwesomeIcon
          style={{ color, height:30 }}
          icon={
            currentRating >= 1
              ? faStar
              : currentRating >= 0.5
              ? faStarHalfAlt
              : farStarRegular
          }
          onClick={() => handleStarClick(1)}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={({ color, height:30 })}
          icon={
            currentRating >= 2
              ? faStar
              : currentRating >= 1.5
              ? faStarHalfAlt
              : farStarRegular
          }
          onClick={() => handleStarClick(2)}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={({ color, height:30 })}
          icon={
            currentRating >= 3
              ? faStar
              : currentRating >= 2.5
              ? faStarHalfAlt
              : farStarRegular
          }
          onClick={() => handleStarClick(3)}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={({ color, height:30 })}
          icon={
            currentRating >= 4
              ? faStar
              : currentRating >= 3.5
              ? faStarHalfAlt
              : farStarRegular
          }
          onClick={() => handleStarClick(4)}
        />
      </span>
      <span>
        <FontAwesomeIcon
          style={({ color, height:30 })}
          icon={
            currentRating >= 5
              ? faStar
              : currentRating >= 4.5
              ? faStarHalfAlt
              : farStarRegular
          }
          onClick={() => handleStarClick(5)}
        />
      </span>
      <span style={{ marginLeft: 8 }}>{text}</span>
    </div>
  );
}

export default RatingClickable;
