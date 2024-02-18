import React from "react";
import { useGetMoviesQuery } from "../../slice/movieApiSlice";

const MovieList: React.FC = () => {
  const { data, isLoading, isError } = useGetMoviesQuery();
  // console.log(data.results);
  console.log(data);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    return <h1>Some thing went wrong</h1>;
  }

  return (
    <>
      <h1>MovieList: data fetching is successful!!!</h1>
      <h3>Here goes the list of the movies:</h3>
      {data &&
        data.results.map((movie, index) => (
          <div key={movie.id}>
            <br />
            <h3>
              {`${index + 1}. `}
              {movie.original_title}
            </h3>
            <p>{movie.id}</p>
            <p>{movie.overview}</p>
          </div>
        ))}
    </>
  );
};

export default MovieList;
