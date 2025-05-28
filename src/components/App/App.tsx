import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // закриваю по ESC
  useEffect(() => {
    if (!selectedMovie) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };

    //  ESLint шоб не сварився и не видавав помилку
  }, [selectedMovie]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    setMovies([]);
    setError(false);
    setLoading(true);
    try {
      const data = await fetchMovies({ query });
      if (data.results.length === 0) {
        toast("No movies found for your request.", { icon: "❌" });
      }
      setMovies(data.results);
    } catch {
      setError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // закриваю модалку по кліку
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <div
          onClick={handleBackdropClick}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default App;
