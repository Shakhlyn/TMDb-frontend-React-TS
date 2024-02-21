import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingPropsType {
  vote_average: number;
  vote_count?: number;
  popularity?: number;
}

const Rating: React.FC<RatingPropsType> = (props) => {
  return (
    <div className="flex flex-row gap-4 items-center text-sm mb-1">
      <div className="flex flex-row gap-1 items-center">
        <FaStar className="text-yellow-500 inline" />
        <p>
          <strong>{props.vote_average.toFixed(1)}</strong>
        </p>
      </div>
      {props.vote_count && <p>({props.vote_count} votes)</p>}
      {props.popularity && <p>Popularity: {props.popularity.toFixed(0)}</p>}
    </div>
  );
};

export default Rating;
