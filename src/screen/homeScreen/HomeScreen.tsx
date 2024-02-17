import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
  return (
    <div className=" m-10 ">
      <h1>HomeScreen</h1>
      <Link to="/movies">Go to movies</Link>
    </div>
  );
};

export default HomeScreen;
