import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { BsBookmarkPlusFill } from "react-icons/bs";

import { useGetMoviesQuery } from "../slice/movieApiSlice";

import { useAppSelector } from "../slice/hooks";

const MovieList: React.FC = () => {
  const startDateFromStore = useAppSelector((state) => state.dates.startDate);
  const endDateFromStore = useAppSelector((state) => state.dates.endDate);

  const [startDateToFetch, setStartDateToFetch] =
    useState<string>(startDateFromStore);
  const [endDateToFetch, setEndDateFetch] = useState<string>(endDateFromStore);

  const { startDate, endDate } = useParams<{
    startDate: string;
    endDate: string;
  }>();

  useEffect(() => {
    if (startDate && endDate) {
      setStartDateToFetch(startDate);
      setEndDateFetch(endDate);
    }
  }, [startDate, endDate]);

  // const searchParams = new URLSearchParams(window.location.search);

  // const searchStartDate = searchParams.get("start-date");
  // const searchEndDate = searchParams.get("end-date");

  // if (searchStartDate && searchEndDate) {
  //   setStartDate(searchStartDate);
  //   setEndDate(searchEndDate);
  // }

  const [page, setPage] = useState<number>(1);
  console.log(page, startDateToFetch, endDateToFetch);

  const { data, isLoading, isError, isFetching } = useGetMoviesQuery({
    page,
    startDateToFetch,
    endDateToFetch,
  });
  // const { data, isLoading, isError, isFetching } = useGetMoviesQuery(page);
  // ****change id the rtk with type

  // if movies == null | undefined, set []
  const movies = data?.results ?? [];

  useEffect(() => {
    const onScroll = () => {
      const scrolledBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledBottom && !isFetching) {
        console.log("Fetching more data ...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching, startDateToFetch, endDateToFetch]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    return <h1>Some thing went wrong</h1>;
  }

  return (
    <>
      <h1 className="text-3xl">MovieList: data fetching is successful!!!</h1>
      <h3 className="mb-12 text-2xl">Here goes the list of the movies:</h3>
      <div className=" w-5/6 mx-auto">
        {movies &&
          movies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className=" w-full flex flex-row gap-4 mb-10 p-2 rounded shadow shadow-gray-800 "
            >
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="image"
                  className=" w-40 h-auto "
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <div className="flex gap-1">
                    {movie.title === movie.original_title ? (
                      <h2>
                        {`${index + 1}. `}
                        {movie.original_title}
                      </h2>
                    ) : (
                      <h2>
                        {`${index + 1}. `}
                        {movie.original_title} - ({movie.title})
                      </h2>
                    )}
                    <p>({movie.release_date})</p>
                  </div>
                  <BsBookmarkPlusFill
                    className="text-rose-500 cursor-pointer "
                    onClick={() => alert("Saved in your watchlist")}
                  />
                </div>

                <div className="flex flex-row gap-4 mb-4 ">
                  <p>Rating: {movie.vote_average.toFixed(1)} </p>
                  <p>Total votes: {movie.vote_count} </p>
                  <p> Popularity: {movie.popularity.toFixed(1)} </p>
                </div>
                <p>{movie.overview} </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MovieList;
