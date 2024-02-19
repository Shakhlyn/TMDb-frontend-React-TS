import React, { useState, useEffect } from "react";

import { BsBookmarkPlusFill } from "react-icons/bs";

import { useGetMoviesQuery } from "../../slice/movieApiSlice";

const MovieList: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isFetching } = useGetMoviesQuery(page);

  // if movies == null | undefined, set []
  const movies = data?.results ?? [];
  // console.log(data);

  useEffect(() => {
    const onScroll = () => {
      const scrolledBotton =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledBotton && !isFetching) {
        console.log("Fetching more data ...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

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
      {/* <br /> */}
      {movies &&
        movies.map((movie, index) => (
          <div className=" w-5/6 mx-auto">
            <div
              key={`${movie.id}-${index}`}
              className=" w-full flex flex-row gap-4 mb-10 p-2 rounded shadow shadow-gray-800 "
            >
              <div>
                <h1>Image</h1>
                {/* <img src="" alt="" /> */}
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
                  <p>Rating: {movie.vote_average} </p>
                  <p>Total votes: {movie.vote_count} </p>
                  <p> Popularity: {movie.popularity} </p>
                </div>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MovieList;
