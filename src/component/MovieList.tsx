import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetMoviesQuery } from "../slice/movieApiSlice";
import { useAppSelector } from "../slice/hooks";

import MovieCard from "./MovieCard";
import Loader from "./Loader";
import Error from "./Error";

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

  const { data, isLoading, isError, isFetching, error } = useGetMoviesQuery({
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
    return <Loader />;
  }

  if (isError) {
    return <Error message="Please try again with proper input values" />;
  }

  return (
    <>
      <h1 className="text-3xl">MovieList: data fetching is successful!!!</h1>
      <h3 className="mb-12 text-2xl">Here goes the list of the movies:</h3>
      <div className=" w-5/6 mx-auto">
        {movies &&
          movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
      </div>
    </>
  );
};

export default MovieList;
