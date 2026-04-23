import React from 'react';
import Focusable from '../common/Focusable';
import './MovieCard.css';

/**
 * MovieCard Component
 * 
 * Individual movie card component for displaying movie thumbnails.
 * Supports focus states for TV navigation.
 */
function MovieCard({ id, movie, onSelect, onHover, onLeave }) {
  const { title, image, rating, year, match } = movie;

  const handleFocus = () => {
    if (onHover) {
      onHover(movie);
    }
  };

  const handleBlur = () => {
    if (onLeave) {
      onLeave();
    }
  };

  return (
    <Focusable
      id={id}
      role="button"
      aria-label={`View details for ${title}`}
      className="movie-card"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onSelect={() => onSelect && onSelect(movie)}
    >
      {/* Poster Image */}
      <div className="movie-poster">
        <img
          src={image}
          alt={title}
          className="movie-poster-image"
          loading="lazy"
        />

        {/* Match Percentage Badge */}
        {match && (
          <span className="movie-match">{match}% Match</span>
        )}

        {/* Rating Badge */}
        {rating && (
          <span className="movie-rating-badge">{rating}</span>
        )}
      </div>

      {/* Card Info (shown on focus) */}
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          {year && <span className="movie-year">{year}</span>}
          {match && (
            <>
              <span className="movie-separator">•</span>
              <span className="movie-match-text">{match}% Match</span>
            </>
          )}
        </div>
      </div>
    </Focusable>
  );
}

export default MovieCard;