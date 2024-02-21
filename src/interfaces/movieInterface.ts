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

export interface MoviesResponseData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailsResponse {
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
