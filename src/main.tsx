import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store.ts";

import App from "./App.tsx";
import HomeScreen from "./screen/homeScreen/HomeScreen.tsx";
import MovieList from "./component/MovieList.tsx";
import MovieDetailsScreen from "./screen/movieScreen/MovieDetailsScreen.tsx";
import WatchListScreen from "./screen/watchListScreen/WatchListScreen.tsx";
import ErrorScreen from "./screen/errorScreen/ErrorScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* If roote URL is accessed, it will redirect to "/movie" */}
      <Route path="" element={<Navigate to="movie" />} />

      <Route path="movie" element={<HomeScreen />} />

      <Route path="movies" element={<MovieList />} />
      <Route path="watchlist" element={<WatchListScreen />} />
      <Route path="movies/:movieId" element={<MovieDetailsScreen />} />
      <Route path="movies/:startDate/:endDate" element={<MovieList />} />
      <Route path="*" element={<ErrorScreen />} />
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
