/**
 * Central place for all TMDB-related constants and helpers.
 * If the image base URL or storage key ever changes, it only needs
 * to be updated here (Single Source of Truth).
 */
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

/** Builds the full TMDB poster URL for a given poster path. */
export const buildPosterUrl = (posterPath) =>
  `${TMDB_IMAGE_BASE_URL}${posterPath}`;
