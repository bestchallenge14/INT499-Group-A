/*  
    StreamList App
    Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 10, 2026
*/


import { useMovieList } from "../hooks/useMovieList";
import { Hero, SearchBar, Stats, MovieList } from "./streamlist/StreamListParts";

function FeatureCard() {
  return (
    <div className="feature-card">
      <div className="feature-icon">▶</div>
      <h2>One List. Endless Entertainment.</h2>
      <p>
        Keep track of the movies and shows you
        want to watch in one convenient place.
      </p>
    </div>
  );
}

/**
 * Container component (Composition Root).
 * Owns no logic itself — it wires the useMovieList hook to
 * presentational components (Separation of Concerns).
 */
function StreamList() {
  const list = useMovieList();

  return (
    <section className="streamlist">
      <div className="hero-content">
        <Hero />

        <SearchBar value={list.search} onChange={list.setSearch} />

        <Stats stats={list.stats} onClearAll={list.clearAllMovies} />

        <MovieList
          movies={list.filteredMovies}
          editing={{ id: list.editingId, title: list.editedTitle }}
          onTitleChange={list.setEditedTitle}
          onSave={list.renameMovie}
          onToggleCompleted={list.toggleCompleted}
          onStartEditing={list.startEditing}
          onToggleFavorite={list.toggleFavorite}
          onDelete={list.deleteMovie}
        />
      </div>

      <FeatureCard />
    </section>
  );
}

export default StreamList;
