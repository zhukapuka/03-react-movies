import axios from "axios";
import type { Movie } from "../types/movie";

// Типізую її параметри
interface FetchMoviesParams {
  query: string;
}

// Типізую результат
interface FetchMoviesResult {
  results: Movie[];
}

export async function fetchMovies({
  query,
}: FetchMoviesParams): Promise<FetchMoviesResult> {
  const response = await axios.get<FetchMoviesResult>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data;
}
