import React, { useRef } from 'react';
import Focusable from '../common/Focusable';
import MovieCard from './MovieCard';
import './MovieRow.css';

/**
 * MovieRow Component
 * 
 * Horizontal scrollable row of movie cards with navigation arrows.
 * Uses Norigin Spatial Navigation for arrow key navigation.
 */
function MovieRow({ id, title, movies = [], onSelectMovie, onMovieHover }) {
  const rowRef = useRef(null);

  const handleScrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: -400,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="movie-row" aria-label={title}>
      {/* Section Header */}
      <div className="movie-row-header">
        <Focusable
          id={`${id}-header`}
          className="movie-row-title"
          role="heading"
          aria-level={2}
        >
          {title}
        </Focusable>
      </div>

      {/* Scroll Controls */}
      <Focusable
        id={`${id}-scroll-left`}
        className="movie-row-scroll movie-row-scroll-left"
        role="button"
        aria-label="Scroll left"
        onSelect={handleScrollLeft}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Focusable>

      <Focusable
        id={`${id}-scroll-right`}
        className="movie-row-scroll movie-row-scroll-right"
        role="button"
        aria-label="Scroll right"
        onSelect={handleScrollRight}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Focusable>

      {/* Movies Container */}
      <div
        ref={rowRef}
        className="movie-row-container"
        id={`${id}-container`}
        role="list"
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            id={`${id}-movie-${index}`}
            movie={movie}
            onSelect={onSelectMovie}
            onHover={onMovieHover}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;