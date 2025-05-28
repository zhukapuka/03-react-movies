import React from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("query") as string;

    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    onSubmit(query.trim());
    form.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Powered by TMDB
        </a>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
