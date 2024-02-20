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

// export const movieApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getMovies: builder.query<MoviesResponseData | undefined, number>({
//       // getMovies: builder.query<MoviesResponseData | undefined, {page: number, startDateToFetch: string, endDateToFetch: string}>({
//       // getMovies: builder.query<MoviesResponseData | undefined, {}>({
//       // query: ({ searchKeyword, pageNumber }) => ({
//       // query: (pageNumber: number) => ({
//       //   query: ({
//       //     page: number,
//       //     startDateToFetch: string,
//       //     endDateToFetch: string
//       //  } ) => ({
//       query: (page) => ({
//         url: `${FIND_MOVIE_WITHIN_DATES_URL}?${API_KEY}&release_date.gte=19-02-2024&release_date.lte=19-02-2024&page=${page}&sort_by=popularity.desc&offset=${
//           page * 20
//         }&limit=20`,
//         params: {

//         }
//       }),
//       serializeQueryArgs: ({ endpointName }) => {
//         return endpointName;
//       },
//       // Always merge incoming data to the cache entry
//       merge: (
//         currentCache: MoviesResponseData | undefined,
//         newItems: MoviesResponseData
//       ) => {
//         if (currentCache && newItems) {
//           //   return {
//           //     ...newItems,
//           //     results: [...currentCache.results, ...newItems.results],
//           //   };
//           // }
//           // return newItems;

//           if (newItems.page === currentCache.page + 1) {
//             return {
//               ...newItems,
//               results: [...currentCache.results, ...newItems.results],
//             };
//           } else {
//             // If the new page isn't the next sequential page, return newItems directly
//             return newItems;
//           }
//         }
//         return newItems;
//       },
//       // Refetch when the page arg changes
//       forceRefetch({ currentArg, previousArg }) {
//         return currentArg !== previousArg;
//       },

//       providesTags: [{ type: "Movies", id: "LIST" }],
//     }),
//   }),
// });

// export const { useGetMoviesQuery } = movieApiSlice;

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<
      MoviesResponseData,
      { page: number; startDateToFetch: string; endDateToFetch: string }
    >({
      query: ({ page, startDateToFetch, endDateToFetch }) => ({
        // url: `${FIND_MOVIE_WITHIN_DATES_URL}?${API_KEY}&release_date.gte=${startDateToFetch}&release_date.lte=${endDateToFetch}&page=${page}&sort_by=popularity.desc&offset=${
        //   page * 20
        // }&limit=20`,
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

      serializeQueryArgs: ({ queryArgs }) => {
        console.log(queryArgs);
        const { page, startDateToFetch, endDateToFetch } = queryArgs;
        return { page, startDateToFetch, endDateToFetch };
      },

      // merge: (currentCache, newItems) => {
      //   if (currentCache && newItems) {
      //     if (newItems.page === currentCache.page + 1) {
      //       return {
      //         ...newItems,
      //         results: [...currentCache.results, ...newItems.results],
      //       };
      //     } else {
      //       return newItems;
      //     }
      //   }
      //   return newItems;
      // },

      merge: (currentCache, newItems) => {
        if (currentCache && newItems) {
          if (newItems.page === currentCache.page + 1) {
            return {
              ...newItems,
              results: [...currentCache.results, ...newItems.results],
            };
          } else {
            return {
              ...newItems,
              results: [...newItems.results, ...currentCache.results],
            };
          }
        }
        return newItems;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [{ type: "Movies", id: "LIST" }],
    }),
  }),
});

export const { useGetMoviesQuery } = movieApiSlice;
