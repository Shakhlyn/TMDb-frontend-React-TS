// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

// import { useGetMoviesQuery } from "../slice/movieApiSlice";
// import { useAppSelector } from "../slice/hooks";

// import MovieCard from "./MovieCard";
// import Loader from "./Loader";
// import Error from "./Error";

// const NewMovieList: React.FC = () => {
//   const startDateFromStore = useAppSelector((state) => state.dates.startDate);
//   const endDateFromStore = useAppSelector((state) => state.dates.endDate);

//   const [startDateToFetch, setStartDateToFetch] =
//     useState<string>(startDateFromStore);
//   const [endDateToFetch, setEndDateFetch] = useState<string>(endDateFromStore);

//   const { startDate, endDate } = useParams<{
//     startDate: string;
//     endDate: string;
//   }>();

//   useEffect(() => {
//     if (startDate && endDate) {
//       setStartDateToFetch(startDate);
//       setEndDateFetch(endDate);
//     }
//   }, [startDate, endDate]);

//   const [page, setPage] = useState<number>(1);

//   const { data, isLoading, isError, isFetching } = useGetMoviesQuery({
//     page,
//     startDateToFetch,
//     endDateToFetch,
//   });

//   // if movies == null | undefined, set []
//   const movies = data?.results ?? [];

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return <Error message="Please try again with proper input values" />;
//   }

//   return (
//     <>
//       <h1 className="text-3xl">NewMovieList: data fetching is successful!!!</h1>
//       <h3 className="mb-12 text-2xl">Here goes the list of the movies:</h3>
//       <div className=" w-5/6 mx-auto">
//         <InfiniteScroll
//           dataLength={movies.length}
//           next={fetchNextPage}
//           hasMore={true}
//           loader={<Loader />}
//         >
//           {movies.map((movie, index) => (
//             <MovieCard key={movie.id} movie={movie} index={index} />
//           ))}
//         </InfiniteScroll>
//       </div>
//     </>
//   );
// };

// export default NewMovieList;

import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { useGetMoviesQuery } from "../slice/newMovieApiSlice";
import { useAppSelector } from "../slice/hooks";

import MovieCard from "./MovieCard";
import Loader from "./Loader";
import Error from "./Error";
import { Movie } from "../interfaces/movieInterface";

const NewMovieList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [movieList, setMovieList] = useState<Movie[]>([]);

  //   *******************************************

  //   const startDateFromStore = useAppSelector((state) => state.dates.startDate);
  //   const endDateFromStore = useAppSelector((state) => state.dates.endDate);

  //   const [startDateToFetch, setStartDateToFetch] =
  //     useState<string>(startDateFromStore);
  //   const [endDateToFetch, setEndDateFetch] = useState<string>(endDateFromStore);

  //   const { startDate, endDate } = useParams<{
  //     startDate: string;
  //     endDate: string;
  //   }>();

  //   useEffect(() => {
  //     if (startDate && endDate) {
  //       setStartDateToFetch(startDate);
  //       setEndDateFetch(endDate);
  //     }
  //   }, [startDate, endDate]);

  //   *******************************************

  const { data, isLoading, isError } = useGetMoviesQuery(page);

  useEffect(() => {
    if (data) {
      setMovieList((movieList) => [...movieList, ...data.results]);

      setHasMore(data.results.length > 0); // Set hasMore to false if there are no more results
    }
  }, [data]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Please try again with proper input values" />;
  }

  return (
    <>
      <h1 className="text-3xl">NewMovieList: data fetching is successful!!!</h1>
      <h3 className="mb-12 text-2xl">Here goes the list of the movies:</h3>
      <div className=" w-5/6 mx-auto">
        {movieList && (
          <InfiniteScroll
            dataLength={movieList.length}
            next={fetchNextPage}
            hasMore={hasMore}
            loader={<p>Loading ...</p>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {movieList.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default NewMovieList;
