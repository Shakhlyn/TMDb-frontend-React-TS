import React from "react";

import RandomMovies from "./RandomMovies";
import MovieList from "../../component/MovieList";

const HomeScreen: React.FC = () => {
  return (
    <>
      <RandomMovies />
      <MovieList />
    </>
  );
};

export default HomeScreen;
