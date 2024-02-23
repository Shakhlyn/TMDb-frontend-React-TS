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
    <div className="w-[98%] md:w-11/12 mx-auto px-4 py-8">
      {movie && (
        <section>
          <div className="mb-6">
            <div className="flex flex-row justify-between mb-4">
              <h1 className=" mobile:text-lg sm:text-xl md:text-3xl mobile:font-semibold md:font-bold">
                {movie.title}
              </h1>

              <div className="flex mobile:gap-2 md:gap-4 items-center">
                <Rating vote_average={movie.vote_average} />

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
            <div className=" hidden sm:flex sm:flex-row">
              <span>{movie.release_date}</span>
              <span className=" mobile:mx-2 sm:mx-4"> | </span>

              {/* <span> | </span> */}
              <span>Run Time: {movie.runtime} minutes</span>
            </div>
          </div>
          <div>
            <div className="flex">
              {/* <div> */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className=" w-1/3 h-fit md:w-64 md:h-auto"
              />
              {/* </div> */}
              <div className="ml-8 flex flex-col gap-4">
                <p className=" mobile:text-sm md:text-lg">{movie.tagline}</p>

                <div>
                  <ul className="list-none flex flex-row ">
                    {movie.genres.map((genre) => (
                      <li
                        key={genre.id}
                        className=" mobile:px-2 mobile:py-1 md:px-4 md:py-2 mx-1 mobile:text:mobile sm:text-sm h-fit rounded-3xl shadow-sm shadow-rose-800 "
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className=" sm:hidden flex flex-col gap-1">
                  <p>Release Date: {movie.release_date}</p>
                  <p>Run Time: {movie.runtime} minutes</p>
                </div>

                <div className="mt-4 hidden sm:block">
                  <h2 className="text-lg font-semibold">Overview</h2>
                  <p className="">{movie.overview}</p>
                </div>
              </div>
            </div>

            <div className="mt-4  sm:hidden">
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="">{movie.overview}</p>
            </div>
          </div>
        </section>
      )}

      {movie && (
        <div className="grid grid-cols-12 mobile:gap-3 sm:gap-6 text-sm md:text-lg mt-12">
          <section className=" col-span-7 ">
            <div className="mt-4">
              <h2 className="mb-2 text-lg md:text-xl font-semibold">
                Other information
              </h2>

              <p>Original Title: {movie.original_title}</p>

              <p>Total votes: {movie.vote_count}</p>
              <p>Popularity: {movie.popularity.toFixed(0)}</p>
              <p>Budget: ${movie.budget}</p>
              <p>Box office: ${movie.revenue}</p>
            </div>
          </section>
          <section className=" col-span-5 ">
            <div className="mt-4">
              <h2 className="mb-2 text-lg md:text-xl font-semibold">
                Production Companies
              </h2>
              <ul className="list-disc list-inside">
                {movie.production_companies?.map((company, index) => (
                  <li key={index}>{company.name}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}

      {credits && (
        <section className="my-20 lg:w-10/12 mx-auto">
          <div className="flex flex-col gap-8 w-full">
            <div>
              <h1 className="text-center text-2xl mb-4">Casts</h1>
              <div className="w-full mx-auto shadow-rose-800 shadow-sm px-3 py-4 grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  {credits?.cast &&
                    credits?.cast
                      .slice(0, Math.ceil(credits.cast.length / 2))
                      .map((cast, index) => (
                        <div
                          key={`${cast.id}-${index}`}
                          className="mb-8 flex flex-col gap-1"
                        >
                          <h3>
                            {index + 1}. {cast.name}
                          </h3>
                          <p>Character: {cast.character}</p>
                          <p>Popularity: {cast.popularity.toFixed(0)}</p>
                        </div>
                      ))}
                </div>
                <div className="col-span-1">
                  {credits?.cast &&
                    credits?.cast
                      .slice(Math.ceil(credits.cast.length / 2))
                      .map((cast, index) => (
                        <div
                          key={`${cast.id}-${index}`}
                          className="mb-8 flex flex-col gap-1"
                        >
                          <h3>
                            {index + Math.ceil(credits.cast.length / 2) + 1}.{" "}
                            {cast.name}
                          </h3>
                          <p>Character: {cast.character}</p>
                          <p>Popularity: {cast.popularity.toFixed(0)}</p>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-center text-2xl mb-4">Crews</h1>
              <div className="w-full mx-auto shadow-rose-800 shadow-sm px-3 py-4 grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  {credits?.crew &&
                    credits?.crew
                      .slice(0, Math.ceil(credits.crew.length / 2))
                      .map((crew, index) => (
                        <div
                          key={`${crew.id}-${index}`}
                          className="mb-8 flex flex-col gap-1"
                        >
                          <h3>
                            {index + 1}. {crew.name}
                          </h3>
                          <p>Job: {crew.job}</p>
                          <p>Popularity: {crew.popularity}</p>
                        </div>
                      ))}
                </div>
                <div className="col-span-1">
                  {/* <h1 className="text-center text-2xl mb-4">Casts Right</h1> */}
                  {credits?.crew &&
                    credits?.crew
                      .slice(Math.ceil(credits.crew.length / 2))
                      .map((crew, index) => (
                        <div
                          key={`${crew.id}-${index}`}
                          className="mb-8 flex flex-col gap-1"
                        >
                          <h3>
                            {index + Math.ceil(credits.crew.length / 2) + 1}.{" "}
                            {crew.name}
                          </h3>
                          <p>job: {crew.job}</p>
                          <p>Popularity: {crew.popularity.toFixed(0)}</p>
                        </div>
                      ))}
                </div>
              </div>
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
