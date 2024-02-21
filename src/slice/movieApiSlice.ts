import { apiSlice } from "./apiSlice";

import {
  MoviesResponseData,
  MovieDetailsResponse,
  MovieGenresResponseType,
} from "../interfaces/movieInterface";
import { CreditsResponseType } from "../interfaces/creditsInterface";

import { DISCOVER_MOVIE_URL, API_KEY, GENRE_LIST_URL } from "../constant";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<
      MoviesResponseData,
      { page: number; startDateToFetch: string; endDateToFetch: string }
    >({
      query: ({ page, startDateToFetch, endDateToFetch }) => ({
        url: `${DISCOVER_MOVIE_URL}`,
        params: {
          api_key: `${API_KEY}`,
          "primary_release_date.gte": startDateToFetch,
          "primary_release_date.lte": endDateToFetch,
          sort_by: "popularity.desc",
          page: `${page}`,
          offset: `${page * 20}`,
          limit: "20", // Adjust the limit as per your requirement
        },
      }),
      providesTags: ["Movies"],
    }),

    // https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}page=1&sort_by=popularity.desc&with_genres=drama'

    getMoviesByGenre: builder.query<MoviesResponseData, string>({
      query: (genre) => ({
        url: `${DISCOVER_MOVIE_URL}`,
        params: {
          api_key: `${API_KEY}`,
          sort_by: "popularity.desc",
          with_genres: `${genre}`,
          // page: `${page}`,
        },
      }),
    }),

    // MOVIE DETAILS:
    getMovieDetails: builder.query<MovieDetailsResponse, string>({
      query: (id) => ({
        url: `/movie/${id}`,
        params: {
          api_key: `${API_KEY}`,
        },
      }),
    }),

    // get similar movies:
    // https://api.themoviedb.org/3/movie/:movieId/similar?api_key=cd890f94a756b1518a2a17617a5b430e&language=en-US&page=1

    getSimilarMovies: builder.query<MoviesResponseData, string>({
      query: (id) => ({
        url: `/movie/${id}/similar`,
        params: {
          api_key: `${API_KEY}`,
        },
      }),
    }),

    // CASTS & CREWS
    // https://api.themoviedb.org/3/movie/634492/credits?api_key=cd890f94a756b1518a2a17617a5b430e&language=en-US

    getCredits: builder.query<CreditsResponseType, string>({
      query: (id) => ({
        url: `/movie/${id}/credits`,
        params: {
          api_key: `${API_KEY}`,
        },
      }),
    }),

    //   get list of genres:
    //   https://api.themoviedb.org/3/genre/movie/list?language=en
    getGenreList: builder.query<MovieGenresResponseType, void>({
      query: () => ({
        url: `${GENRE_LIST_URL}`,
        params: {
          api_key: `${API_KEY}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetCreditsQuery,
  useGetMoviesByGenreQuery,
  useGetGenreListQuery,
} = movieApiSlice;
