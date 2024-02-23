import React, { useState, useEffect } from "react";

import { MovieGenre } from "../../interfaces/movieInterface";

import { useGetGenreListQuery } from "../../slice/movieApiSlice";

import MoviesByGenres from "./MoviesByGenres";

const RandomMovies: React.FC = () => {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  const { data } = useGetGenreListQuery();

  useEffect(() => {
    if (data) {
      setGenres(data.genres);
    }
  }, [data]);

  return (
    <div>
      {genres.map((genre) => (
        <div key={`${genre.id}`} className="mt-16">
          <h1 className=" text-mobile sm:text-sm md:text-lg font-semibold text-rose-700 bg-yellow-400 w-fit px-2 py-1 rounded">
            {" "}
            {genre.name}
          </h1>
          <MoviesByGenres genre={`${genre.id}`} />
        </div>
      ))}
    </div>
  );
};

export default RandomMovies;
