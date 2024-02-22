import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaImdb } from "react-icons/fa6";

import {
  useGetMovieDetailsQuery,
  useGetCreditsQuery,
  useGetSimilarMoviesQuery,
} from "../../slice/movieApiSlice";
import { addMovieToWatchList } from "../../slice/watchListSlice";

import { useAppDispatch } from "../../slice/hooks";

import { Movie, MovieDetailsResponse } from "../../interfaces/movieInterface";

import Rating from "../../component/Rating";
import Loader from "../../component/Loader";
import Error from "../../component/Error";

import Movies from "../../component/Movies";

const MovieDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [similarMovies, setSimilarMovies] = useState<Movie[]>();

  const { movieId } = useParams<{ movieId: any }>();

  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);
  const { data: credits, isError: isCreditError } = useGetCreditsQuery(movieId);
  const { data, isLoading: isSimilarMovieLoading } =
    useGetSimilarMoviesQuery(movieId);

  useEffect(() => {
    if (data) {
      setSimilarMovies(data.results);
    }
  }, [data]);

  const addMovieToWatchListHandler: (movie: MovieDetailsResponse) => void = (
    movie
  ) => {
    dispatch(addMovieToWatchList(movie));
    alert("Saved in your watchlist");
  };

  //
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Please try again" />;
  }

  if (isCreditError) {
    return <Error message="Please try again" />;
  }

  return (
    <div className=" w-11/12 mx-auto px-4 py-8">
      {movie && (
        <section>
          <div className="mb-2">
            <div className="flex flex-row justify-between mb-4">
              <h1 className="text-3xl font-bold">{movie.title}</h1>

              <div className="flex gap-4 items-center">
                <Rating
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                />

                <BsBookmarkPlusFill
                  className="text-rose-500 cursor-pointer text-2xl"
                  onClick={() => addMovieToWatchListHandler(movie)}
                  // alert("Saved in your watchlist")
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
        </section>
      )}

      {/* {movie && (
        <section>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Production Companies</h2>
            <ul className="list-disc list-inside">
              {movie.production_companies?.map((company, index) => (
                <li key={index}>{company.name}</li>
              ))}
            </ul>
          </div>
        </section>
      )} */}

      {credits && (
        <section className="my-20">
          <div className="flex flex-row gap-8 w-full">
            <div className=" w-1/2 shadow-rose-800 shadow-sm px-3 py-4 ">
              <h1 className="text-center text-2xl mb-4">Casts</h1>
              {credits?.cast &&
                credits?.cast.map((cast, index) => (
                  <div key={`${cast.id}-${index}`} className=" mb-4">
                    <div className="flex flex-row justify-between">
                      <h3>{cast.name}</h3>
                      <p>Popularity: {cast.popularity.toFixed(0)}</p>
                    </div>
                    <p>Character: {cast.character}</p>
                  </div>
                ))}
            </div>
            <div className=" w-1/2  shadow-rose-800 shadow-sm px-3 py-4 ">
              <h1 className="text-center text-2xl mb-4">Crews</h1>
              <div className="mb-3 flex flex-row justify-between">
                <p className="text-lg">Name</p>
                <p className="text-lg">Job</p>
              </div>
              {credits?.crew &&
                credits?.crew.map((crew, index) => (
                  <div
                    key={`${crew.id}-${index}`}
                    className="mb-3 flex flex-row justify-between text-left"
                  >
                    <h3>{crew.name}</h3>
                    <p>{crew.job}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      {/* section for similar movies: */}
      {isSimilarMovieLoading && <p>Loading ...</p>}
      {similarMovies && similarMovies.length > 0 && (
        <Movies movies={similarMovies} headLine="Similar movies" />
      )}
    </div>
  );
};

export default MovieDetailsScreen;
