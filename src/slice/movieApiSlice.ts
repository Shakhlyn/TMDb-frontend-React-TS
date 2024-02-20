import { apiSlice } from "./apiSlice";

import { FIND_MOVIE_WITHIN_DATES_URL, API_KEY, BASE_URL } from "../constant";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MoviesResponseData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// interface MovieDetailsResponse {
//   adult: boolean;
//   backdrop_path: string;
//   belongs_to_collection: null | {
//     id: string;
//     name: string;
//     poster_path: string;
//     backdrop_path: string;
//   };
//   budget: number;
//   genres: object[];
// }

interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null; // This can be null according to the JSON data
    backdrop_path: string | null; // This can be null according to the JSON data
  } | null; // This can be null according to the JSON data
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; // This can be null according to the JSON data
  production_companies:
    | {
        id: number;
        logo_path: string | null; // This can be null according to the JSON data
        name: string;
        origin_country: string;
      }[]
    | null;
  production_countries:
    | {
        iso_3166_1: string;
        name: string;
      }[]
    | null;
  release_date: string;
  revenue: number;
  runtime: number | null; // This can be null according to the JSON data
  spoken_languages:
    | {
        english_name: string;
        iso_639_1: string;
        name: string;
      }[]
    | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (
        currentCache: MoviesResponseData | undefined,
        newItems: MoviesResponseData
      ) => {
        if (currentCache && newItems) {
          //   return {
          //     ...newItems,
          //     results: [...currentCache.results, ...newItems.results],
          //   };
          // }
          // return newItems;

          if (newItems.page === currentCache.page + 1) {
            return {
              ...newItems,
              results: [...currentCache.results, ...newItems.results],
            };
          } else {
            // If the new page isn't the next sequential page, return newItems directly
            return newItems;
          }
        }
        return newItems;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: [{ type: "Movies", id: "LIST" }],
    }),

    // https://api.themoviedb.org/3/movie/movie_id?
    getMovieDetails: builder.query<MovieDetailsResponse, string>({
      query: (id) => ({
        url: `${BASE_URL}/movie/${id}`,
        params: {
          api_key: `${API_KEY}`,
        },
        // url: `https://api.themoviedb.org/3/movie/933131?api_key=cd890f94a756b1518a2a17617a5b430e`,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieDetailsQuery } = movieApiSlice;
