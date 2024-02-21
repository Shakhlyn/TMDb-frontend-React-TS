import { apiSlice } from "./apiSlice";

import {
  MoviesResponseData,
  MovieDetailsResponse,
} from "../interfaces/movieInterface";
import { CreditsResponseType } from "../interfaces/creditsInterface";

import { FIND_MOVIE_WITHIN_DATES_URL, API_KEY, BASE_URL } from "../constant";

export const newMovieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getMovies: builder.query<
    //   MoviesResponseData,
    //   { page: number; startDateToFetch: string; endDateToFetch: string }
    // >({
    //   query: ({ page, startDateToFetch, endDateToFetch }) => ({
    //     url: `${FIND_MOVIE_WITHIN_DATES_URL}`,
    //     params: {
    //       api_key: `${API_KEY}`,
    //       "primary_release_date.gte": startDateToFetch,
    //       "primary_release_date.lte": endDateToFetch,
    //       sort_by: "popularity.desc",
    //       page: `${page}`,
    //       offset: `${page * 20}`,
    //       limit: "20", // Adjust the limit as per your requirement
    //     },
    //   }),
    //   providesTags: ["Movies"],
    // }),
    getMovies: builder.query<
      MoviesResponseData,
      { page: number; startDateToFetch: string; endDateToFetch: string }
    >({
      query: ({ page, startDateToFetch, endDateToFetch }) => ({
        url: `${FIND_MOVIE_WITHIN_DATES_URL}`,
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

    // MOVIE DETAILS:
    getMovieDetails: builder.query<MovieDetailsResponse, string>({
      query: (id) => ({
        url: `${BASE_URL}/movie/${id}`,
        params: {
          api_key: `${API_KEY}`,
        },
      }),
    }),

    // CASTS & CREWS
    // https://api.themoviedb.org/3/movie/634492/credits?api_key=cd890f94a756b1518a2a17617a5b430e&language=en-US

    getCredits: builder.query<CreditsResponseType, string>({
      query: (id) => ({
        url: `${BASE_URL}/movie/${id}/credits`,
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
  useGetCreditsQuery,
} = newMovieApiSlice;
