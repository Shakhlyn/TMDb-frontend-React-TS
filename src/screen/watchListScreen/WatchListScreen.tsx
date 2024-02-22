import React from "react";
import { useAppSelector } from "../../slice/hooks";

const WatchListScreen: React.FC = () => {
  const watchList = useAppSelector((state) => state.watchList.movies);

  const sortedMoviesByAddingToWatchlistTime = watchList
    ? [...watchList].sort((a, b) => b.timestamp - a.timestamp)
    : [];

  /*
    "TypeError: Cannot assign to read-only property '0' of object '[object Array]'", typically occurs when you try to modify an array that is read-only. This can happen in situations where you're attempting to sort an array that is immutable, such as an array returned from a Redux selector.

In your code, you're using useAppSelector from Redux Toolkit to retrieve the watchList array from the Redux store. However, the sort method mutates the array in place, which is not allowed when using Redux state. Redux state should remain immutable.
    */

  return (
    <section>
      {sortedMoviesByAddingToWatchlistTime &&
        sortedMoviesByAddingToWatchlistTime.map((movie, index) => (
          //   <Movies movies={movie} />
          <p key={index}>
            <span>{index}. </span>
            <span>{movie.movie.title}</span>
          </p>
        ))}
    </section>
  );
};

export default WatchListScreen;
