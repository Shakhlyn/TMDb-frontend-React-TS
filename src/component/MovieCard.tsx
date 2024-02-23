import React from "react";
import { Link } from "react-router-dom";
import { BsBookmarkPlusFill } from "react-icons/bs";

import { Movie } from "../interfaces/movieInterface";

import { addMovieToWatchList } from "../slice/watchListSlice";
import { useAppDispatch } from "../slice/hooks";

import Rating from "./Rating";

interface MoviePropsType {
  movie: Movie;
  index: number;
}

const MovieCard: React.FC<MoviePropsType> = ({ movie, index }) => {
  const dispatch = useAppDispatch();

  const addMovieToWatchListHandler: (movie: Movie) => void = (movie) => {
    dispatch(addMovieToWatchList(movie));
    alert("Saved in your watchlist");
  };

  return (
    <div>
      <div className=" w-full flex flex-row gap-4 mb-10 p-2 rounded shadow shadow-gray-800 ">
        <div>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="image"
              className=" w-40 h-auto"
            />
          </Link>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-12 mb-4">
            <div className=" col-span-10 gap-1">
              {movie.title === movie.original_title ? (
                <Link to={`/movies/${movie.id}`}>
                  <h2>
                    {`${index + 1}. `}
                    {movie.original_title}
                  </h2>
                </Link>
              ) : (
                <Link to={`/movies/${movie.id}`}>
                  <h2>
                    {`${index + 1}. `}
                    {movie.original_title} - ({movie.title})
                  </h2>
                </Link>
              )}
              {/* <p>({movie.release_date})</p> */}
            </div>
            <div className="col-span-2 flex justify-end">
              <BsBookmarkPlusFill
                className="text-rose-500 cursor-pointer text-2xl"
                onClick={() => addMovieToWatchListHandler(movie)}
                // alert("Saved in your watchlist")
              />
            </div>
          </div>

          <div className="flex items-start gap-4 ">
            <Rating
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              popularity={movie.popularity}
            />
          </div>
          <p>Release: {movie.release_date}</p>

          <p className="hidden sm:block sm:mt-2">{movie.overview} </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
