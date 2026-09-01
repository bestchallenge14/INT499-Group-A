/*  
    StreamList App
    Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 24, 2026
*/

import { useState } from "react";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&query=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve movies.");
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setError("There was a problem retrieving movie information.");
    } finally {
      setLoading(false);
    }
  };

  const addToStreamList = (movie) => {
  const savedMovies =
    JSON.parse(localStorage.getItem("streamListMovies")) || [];

  const alreadyExists = savedMovies.some(
    (savedMovie) => savedMovie.title === movie.title
  );

  if (alreadyExists) {
    alert(`${movie.title} is already in your StreamList.`);
    return;
  }

  const newMovie = {
    id: Date.now(),
    title: movie.title,
    posterPath: movie.poster_path,
    completed: false,
    favorite: false
  };

  const updatedMovies = [...savedMovies, newMovie];

  localStorage.setItem(
    "streamListMovies",
    JSON.stringify(updatedMovies)
  );

  alert(`${movie.title} was added to your StreamList.`);
};

  return (
    <section className="movies-page">
      <div className="movies-header">
        <span className="eyebrow">
          DISCOVER MOVIES
        </span>

        <h1>Search TMDB</h1>

        <p>
          Search for movies and review information provided
          by The Movie Database.
        </p>

        <form
          className="search-form"
          onSubmit={searchMovies}
        >
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          <button type="submit">
            Search Movies
          </button>
        </form>
      </div>

      {loading && (
        <p>Searching for movies...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <div className="movie-results">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="no-poster">
                No Poster Available
              </div>
            )}

            <div className="movie-info">
              <h2>{movie.title}</h2>

              <p>
                <strong>Release Date:</strong>{" "}
                {movie.release_date || "Not available"}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : "Not rated"}
              </p>

              <p>
                {movie.overview ||
                  "No description available."}
              </p>
              
              <button
                className="add-streamlist-button"
                onClick={() => addToStreamList(movie)}
              >
                Add to StreamList
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Movies;