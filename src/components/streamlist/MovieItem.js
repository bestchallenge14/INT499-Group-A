/*  
    StreamList App
    Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 31, 2026
*/


import { FaCheck, FaEdit, FaStar, FaTrash } from "react-icons/fa";
import { buildPosterUrl } from "../../utils/tmdb";

function MoviePoster({ posterPath, title }) {
  if (!posterPath) {
    return <div className="watchlist-poster placeholder-poster">No Poster</div>;
  }
  return (
    <img
      className="watchlist-poster"
      src={buildPosterUrl(posterPath)}
      alt={`${title} poster`}
    />
  );
}

function EditRow({ editedTitle, onTitleChange, onSave }) {
  return (
    <>
      <input
        value={editedTitle}
        onChange={(event) => onTitleChange(event.target.value)}
      />
      <button onClick={onSave}>Save</button>
    </>
  );
}

function TitleRow({ movie, onToggleCompleted, onStartEditing, onToggleFavorite, onDelete }) {
  const actions = [
    { key: "complete", icon: <FaCheck />, onClick: onToggleCompleted, label: "Toggle completed" },
    { key: "edit", icon: <FaEdit />, onClick: onStartEditing, label: "Edit title" },
    { key: "favorite", icon: <FaStar />, onClick: onToggleFavorite, label: "Toggle favorite" },
    { key: "delete", icon: <FaTrash />, onClick: onDelete, label: "Delete movie" },
  ];

  return (
    <>
      <span
        style={{
          textDecoration: movie.completed ? "line-through" : "none",
          fontWeight: movie.favorite ? "bold" : "normal",
        }}
      >
        {movie.title}
      </span>

      {actions.map(({ key, icon, onClick, label }) => (
        <button key={key} onClick={onClick} aria-label={label}>
          {icon}
        </button>
      ))}
    </>
  );
}

/**
 * Purely presentational movie row (Open/Closed: new display features
 * are added here without touching list logic).
 */
function MovieItem({
  movie,
  isEditing,
  editedTitle,
  onTitleChange,
  onSave,
  onToggleCompleted,
  onStartEditing,
  onToggleFavorite,
  onDelete,
}) {
  return (
    <div className="movie-item">
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />

      {isEditing ? (
        <EditRow
          editedTitle={editedTitle}
          onTitleChange={onTitleChange}
          onSave={onSave}
        />
      ) : (
        <TitleRow
          movie={movie}
          onToggleCompleted={() => onToggleCompleted(movie.id)}
          onStartEditing={() => onStartEditing(movie)}
          onToggleFavorite={() => onToggleFavorite(movie.id)}
          onDelete={() => onDelete(movie.id)}
        />
      )}
    </div>
  );
}

export default MovieItem;
