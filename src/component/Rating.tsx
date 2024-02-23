import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingPropsType {
  vote_average: number;
  popularity?: number;
}

const Rating: React.FC<RatingPropsType> = (props) => {
  return (
    <div className="flex flex-row gap-4 items-center text-sm mb-1">
      {/* <div className="flex flex-row gap-1 items-center "> */}
      <div className="flex flex-row gap-1 items-center justify-start ">
        <FaStar className="text-yellow-500 inline" />
        <p>
          <strong>{props.vote_average.toFixed(1)}</strong>
        </p>
      </div>
      {/* </div> */}
      <div>
        {props.popularity && <p>Popularity: {props.popularity.toFixed(0)}</p>}
      </div>
    </div>
  );
};

export default Rating;
