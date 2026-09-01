/*  
    StreamList App
    Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/


import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";

function Hero() {
  return (
    <>
      <span className="eyebrow">YOUR PERSONAL STREAMING LIST</span>
      <h1>
        Discover something<span> worth watching.</span>
      </h1>

      <div className="browse-movies-section">
        <p>
          Search TMDB to discover movies and add them to your StreamList.
        </p>
        <Link to="/movies" className="browse-movies-button">
          Browse Movies
        </Link>
      </div>
    </>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-filter"
      type="text"
      placeholder="Search your watchlist..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function Stats({ stats, onClearAll }) {
  return (
    <>
      <h3>Total Movies: {stats.total}</h3>
      <h3>Completed: {stats.completed}</h3>
      <h3>Favorites: {stats.favorites}</h3>
      <button className="clear-button" onClick={onClearAll}>
        Clear All
      </button>
      <h3>Movies Added: {stats.total}</h3>
    </>
  );
}

function MovieList({ movies, editing, ...handlers }) {
  if (movies.length === 0) {
    return <p className="empty-message">No movies match your search.</p>;
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          isEditing={editing.id === movie.id}
          editedTitle={editing.title}
          onTitleChange={handlers.onTitleChange}
          onSave={() => handlers.onSave(movie.id)}
          onToggleCompleted={handlers.onToggleCompleted}
          onStartEditing={handlers.onStartEditing}
          onToggleFavorite={handlers.onToggleFavorite}
          onDelete={handlers.onDelete}
        />
      ))}
    </>
  );
}

export { Hero, SearchBar, Stats, MovieList };
