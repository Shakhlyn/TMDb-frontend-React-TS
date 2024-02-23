import React from "react";
import { Link } from "react-router-dom";

import { Movie } from "../interfaces/movieInterface";

interface MoviesType {
  headLine?: string;
  movies: Movie[];
}

const Movies: React.FC<MoviesType> = ({ movies, headLine }) => {
  return (
    <section className="my-20">
      <h1 className="text-lg font-semibold text-rose-700 bg-yellow-400 w-fit px-2 py-1 rounded">
        {headLine}:{" "}
      </h1>

      <div className="mx-4 my-2 shadow-sm rounded shadow-rose-900">
        <div className="grid grid-cols-6 gap-4 w-full h-auto p-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-span-1 flex flex-row items-center justify-around h-full hover:scale-110 transition-transform duration-[400ms]"
            >
              <Link to={`/movies/${movie.id}`} className="w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="image"
                  className="w-full h-auto object-cover rounded-lg hover:"
                />
                <p className="text-center text-sm mt-2 truncate">
                  {movie.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movies;
