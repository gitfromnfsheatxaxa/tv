import React, { useState, useCallback } from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { useCatalog } from '../../contexts/CatalogContext';
import './MovieCard.css';

function MovieCard({ movie, index, onEnterPress, onFocus: onCardFocusProp, rowId, totalCardsInRow }) {
  const [hovered, setHovered] = useState(false);
  const { updateFocusedMovie } = useCatalog();

  const stableId = movie.id ? String(movie.id) : String(index);
  const focusKey = `CARD-${rowId || 'row'}-${stableId}`;

  const handleOnEnterPress = useCallback(() => {
    if (onEnterPress) onEnterPress(movie);
  }, [movie, onEnterPress]);

  const handleOnFocus = useCallback((layout) => {
    updateFocusedMovie(movie);
    if (onCardFocusProp) onCardFocusProp(layout);
  }, [movie, onCardFocusProp, updateFocusedMovie]);

  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: handleOnEnterPress,
    onFocus: handleOnFocus,
    // FIX: Focus-loss prevention (Layer 1 — prevent).
    // When Norigin finds no focusable element in a direction it sets currentFocusKey=null,
    // killing all navigation until page refresh. Returning false blocks the attempt entirely.
    // LEFT at index 0 and RIGHT at last index are dead ends — nothing exists there.
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) return false;
      if (direction === 'right' && index === totalCardsInRow - 1) return false;
      return true;
    },
  });

  const handleClick = useCallback(() => {
    setFocus(focusKey);
    if (onEnterPress) onEnterPress(movie);
  }, [focusKey, onEnterPress, movie]);

  const g1 = movie.gradient1 || '#1c1c1c';
  const g2 = movie.gradient2 || '#2e2e2e';
  const isActive = focused || hovered;

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`movie-card${focused ? ' focused' : ''}${hovered ? ' hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-focus-key={focusKey}
      data-row-id={rowId}
      data-card-index={index}
      data-total-cards={totalCardsInRow}
    >
      {/* ── Poster ── */}
      <div
        className="card-poster"
        style={{ '--g1': g1, '--g2': g2 }}
      >
        {movie.image ? (
          <img
            src={movie.image}
            alt={movie.title}
            className="poster-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="poster-initial">{movie.title.charAt(0)}</span>
        )}

        {/* Play overlay — appears on focus/hover */}
        <div className={`poster-play${isActive ? ' visible' : ''}`}>
          <div className="play-circle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Watch progress bar */}
        {movie.progress > 0 && (
          <div className="poster-progress">
            <div className="progress-fill" style={{ width: `${movie.progress}%` }} />
          </div>
        )}
      </div>

      {/* ── Label below poster (always visible) ── */}
      <div className="card-label">
        <p className="card-title">{movie.title}</p>
        <div className="card-meta">
          {movie.rating && <span className="card-rating">★ {movie.rating}</span>}
          {movie.rating && movie.year && <span className="card-dot">·</span>}
          {movie.year && <span className="card-year">{movie.year}</span>}
          {movie.match && <span className="card-match">{movie.match}%</span>}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
