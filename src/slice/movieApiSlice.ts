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
    getMovies: builder.query<MoviesResponseData | undefined, void>({
      // query: () => 'photos',
      // query: ({ searchKeyword, pageNumber }) => ({
      // query: (pageNumber: number) => ({
      query: () => ({
        url: `${FIND_MOVIE_WITHIN_DATES_URL}?${API_KEY}&release_date.gte=19-02-2024&release_date.lte=18-03-2024&sort_by=popularity.desc`,
        // params: {
        //   pageNumber,
        // },
      }),

      providesTags: [{ type: "Movies", id: "LIST" }],
      // getNextPageParam: (lastPage) => {
      //   if (lastPage.data.length === 0 || !lastPage.next) {
      //     return undefined; // Indicates no more pages
      //   }
      //   return lastPage.next.page + 1;
      // },
      // useInfiniteQuery: true,
    }),
  }),
});

export const { useGetMoviesQuery } = movieApiSlice;
