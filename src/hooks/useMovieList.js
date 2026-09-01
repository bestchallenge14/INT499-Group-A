/*  
    StreamList App
    Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/


import { useCallback, useEffect, useMemo, useState } from "react";

export const STORAGE_KEY = "streamListMovies";

/**
 * Thin abstraction over localStorage so persistence can be
 * swapped or mocked in tests (Dependency Inversion).
 */
const storage = {
  load: (key) => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable — fail silently rather than crash the UI.
    }
  },
};

/**
 * useMovieList — owns all watchlist state and mutations (SRP).
 * Components consume it purely via the returned API.
 */
export function useMovieList() {
  const [movies, setMovies] = useState(() => storage.load(STORAGE_KEY) ?? []);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    storage.save(STORAGE_KEY, movies);
  }, [movies]);

  const deleteMovie = useCallback((id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  }, []);

  const updateMovie = useCallback((id, patch) => {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, ...patch } : movie))
    );
  }, []);

  const toggleCompleted = useCallback(
    (id) => {
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === id ? { ...movie, completed: !movie.completed } : movie
        )
      );
    },
    []
  );

  const toggleFavorite = useCallback(
    (id) => {
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
        )
      );
    },
    []
  );

  const renameMovie = useCallback(
    (id, title) => {
      updateMovie(id, { title });
      setEditingId(null);
    },
    [updateMovie]
  );

  const startEditing = useCallback((movie) => {
    setEditingId(movie.id);
    setEditedTitle(movie.title);
  }, []);

  const clearAllMovies = useCallback(() => setMovies([]), []);

  // Derived data is memoized so filtering/stats aren't recomputed needlessly.
  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      ),
    [movies, search]
  );

  const stats = useMemo(
    () => ({
      total: movies.length,
      completed: movies.filter((m) => m.completed).length,
      favorites: movies.filter((m) => m.favorite).length,
    }),
    [movies]
  );

  return {
    movies,
    filteredMovies,
    stats,
    search,
    editingId,
    editedTitle,
    setSearch,
    setEditedTitle,
    deleteMovie,
    toggleCompleted,
    toggleFavorite,
    renameMovie,
    startEditing,
    clearAllMovies,
  };
}
