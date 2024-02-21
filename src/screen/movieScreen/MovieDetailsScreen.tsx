import React from "react";
import { useParams, Link } from "react-router-dom";

import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaImdb } from "react-icons/fa6";

import { useGetMovieDetailsQuery } from "../../slice/movieApiSlice";

import Rating from "../../component/Rating";

const MovieDetailsScreen: React.FC = () => {
  const { movieId } = useParams<{ movieId: any }>();
  //   const { movieId } = useParams();

  console.log(typeof movieId);

  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);

  if (isLoading) {
    return <p>Loading ... </p>;
  }

  if (!movie || isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-2">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          <div className="flex gap-4 items-center">
            <Rating
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
            {/* <p className="text-yellow-500">
              Rating: {`${movie.vote_average}/10`}{" "}
            </p>
            <p>Votes: {movie.vote_count}</p> */}
            <BsBookmarkPlusFill
              className="text-rose-500 cursor-pointer text-2xl"
              onClick={() => alert("Saved in your watchlist")}
            />
            <Link to={`https://www.imdb.com/title/${movie.imdb_id}`}>
              <FaImdb className="bg-yellow-500 text-black text-2xl " />
            </Link>
          </div>
        </div>
        <div className="flex flex-row">
          <span>{movie.release_date}</span>
          <span className="mx-4"> | </span>

          <span>
            <ul className="list-disc list-inside flex flex-row ">
              {movie.genres.map((genre) => (
                <li key={genre.id} className="mr-4">
                  {genre.name}
                </li>
              ))}
            </ul>
          </span>
          <span> | </span>
          <span className="ml-4">Run Time: {movie.runtime}</span>
        </div>
      </div>
      <div className="flex">
        {/* <div> */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 h-auto"
        />
        {/* </div> */}
        <div className="ml-8">
          <p className="text-lg">{movie.tagline}</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="">{movie.overview}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Production Companies</h2>
        <ul className="list-disc list-inside">
          {movie.production_companies?.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailsScreen;
