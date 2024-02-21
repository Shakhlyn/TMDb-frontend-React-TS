import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetMoviesByGenreQuery } from "../../slice/movieApiSlice";
import { Movie } from "../../interfaces/movieInterface";

interface genrePropsType {
  genre: string;
}

const MoviesByGenres: React.FC<genrePropsType> = ({ genre }) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const { data } = useGetMoviesByGenreQuery(genre);

  useEffect(() => {
    if (data) {
      setMovieList(data.results.slice(0, 5));
    }
  }, [data]);

  return (
    <div className="mx-4 my-2 shadow-sm rounded shadow-rose-900">
      <div className="grid grid-cols-5 gap-4 w-full h-auto p-2">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="col-span-1 flex flex-row items-center justify-around h-full"
          >
            <Link to={`/movie/${movie.id}`} className="w-full">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="image"
                className="w-full h-auto object-cover rounded-lg hover:"
              />
              <p className="text-center text-sm mt-2">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesByGenres;
