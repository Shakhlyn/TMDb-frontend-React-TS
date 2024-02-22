import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDetailsResponse } from "../interfaces/movieInterface";

interface WatchListItemType {
  movie: MovieDetailsResponse | Movie;
  timestamp: number;
}

interface WatchListType {
  movies: WatchListItemType[];
}

// const initialState: WatchListType = {
//   movies: localStorage.getItem("watchList")
//     ? JSON.parse(localStorage.getItem("watchList"))
//     : [],
// };

const initialState: WatchListType = {
  movies: JSON.parse(localStorage.getItem("watchList") || "[]"),
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    addMovieToWatchList: (
      state,
      action: PayloadAction<MovieDetailsResponse | Movie>
    ) => {
      const timestamp = new Date().getTime();
      const newMovie: WatchListItemType = {
        movie: action.payload,
        timestamp: timestamp,
      };
      // **********************************
      const existingMovie = state.movies?.find(
        (movie) => movie.movie.id === action.payload.id
      );

      if (existingMovie) {
        alert("This movie is already in your watchlist!");
        return state;
      } else {
        // Create a new array with the added movie
        const updatedMovies = [...state.movies, newMovie];

        // Update localStorage
        localStorage.setItem("watchList", JSON.stringify(updatedMovies));

        return {
          ...state,
          movies: updatedMovies,
        };
      }
    },
  },
});

export const { addMovieToWatchList } = watchListSlice.actions;

export default watchListSlice.reducer;
