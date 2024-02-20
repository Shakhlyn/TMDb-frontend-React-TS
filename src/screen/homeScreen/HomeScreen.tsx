import React from "react";
import { Link } from "react-router-dom";

import MovieList from "../../component/MovieList";

const HomeScreen: React.FC = () => {
  return (
    <div className=" m-10 ">
      <h1>HomeScreen</h1>
      <Link to="/movies">Go to movies</Link>
      <MovieList />
    </div>
  );
};

export default HomeScreen;
