import React from "react";

import MovieList from "../../component/MovieList";
import RandomMovies from "./RandomMovies";

const HomeScreen: React.FC = () => {
  return (
    <div className=" m-10 ">
      <RandomMovies />
      <MovieList />
    </div>
  );
};

export default HomeScreen;
