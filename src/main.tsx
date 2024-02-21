import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store.ts";

import App from "./App.tsx";
import HomeScreen from "./screen/homeScreen/HomeScreen.tsx";
import NewMovieList from "./component/NewMovieList.tsx";
import MovieDetailsScreen from "./screen/movieScreen/MovieDetailsScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeScreen />} />
      <Route path="movie/:movieId" element={<MovieDetailsScreen />} />
      {/* <Route path="movies" element={<MovieList />} />
      <Route path="movies/:startDate/:endDate" element={<MovieList />} /> */}
      <Route path="movies" element={<NewMovieList />} />
      <Route path="movies/:startDate/:endDate" element={<NewMovieList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
