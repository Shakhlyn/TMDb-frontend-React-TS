import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingPropsType {
  vote_average: number;
  vote_count?: number;
  popularity?: number;
}

const Rating: React.FC<RatingPropsType> = (props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-[.125rem] sm:gap-4 items-center text-sm mb-1">
      <div className="flex flex-row gap-1 items-center justify-between">
        <div className="flex flex-row gap-1 items-center">
          <FaStar className="text-yellow-500 inline" />
          <p>
            <strong>{props.vote_average.toFixed(1)}</strong>
          </p>
        </div>
        {props.vote_count ? (
          props.vote_count > 1 ? (
            <p>({props.vote_count} votes)</p>
          ) : (
            <p>({props.vote_count} vote)</p>
          )
        ) : (
          <p>(0 vote)</p>
        )}
      </div>
      <div>
        {props.popularity && <p>Popularity: {props.popularity.toFixed(0)}</p>}
      </div>
    </div>
  );
};

export default Rating;
