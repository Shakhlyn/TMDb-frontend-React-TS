import { apiSlice } from "./apiSlice";

import { FIND_MOVIE_WITHIN_DATES_URL, API_KEY } from "../constant";

interface Movie {
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

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponseData | undefined, number>({
      // query: ({ searchKeyword, pageNumber }) => ({
      // query: (pageNumber: number) => ({
      query: (page) => ({
        url: `${FIND_MOVIE_WITHIN_DATES_URL}?${API_KEY}&release_date.gte=19-02-2024&release_date.lte=18-03-2024&page=${page}&sort_by=popularity.desc&offset=${
          page * 20
        }&limit=20`,
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
  }),
});

export const { useGetMoviesQuery } = movieApiSlice;
