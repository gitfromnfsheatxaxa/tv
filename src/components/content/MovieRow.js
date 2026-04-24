import React, { useCallback, useRef, useEffect } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import './MovieRow.css';
import MovieCard from './MovieCard';

function MovieRow({ id, title, movies, onMovieSelect, onFocus: onRowFocus, onRegisterFocus }) {
  // hasFocusedChild → drives .content-row.focused CSS (glows, title highlight, arrows)
  const { ref, focusKey, hasFocusedChild } = useFocusable({
    focusKey: id,
    trackChildren: true,
    onFocus: (layout) => {
      if (onRowFocus) onRowFocus({ y: layout.y });
      if (onRegisterFocus) onRegisterFocus(id);
    },
  });

  const scrollRef = useRef(null);

  // Scroll so focused card sits ~60 px from the wrapper's left visible edge
  const onCardFocus = useCallback((layout) => {
    const wrapper = scrollRef.current;
    if (!wrapper) return;
    const { left: wLeft } = wrapper.getBoundingClientRect();
    const target = wrapper.scrollLeft + (layout.x - wLeft) - 60;
    wrapper.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, []);

  const onCardPress = useCallback((movie) => {
    if (onMovieSelect) onMovieSelect(movie);
  }, [onMovieSelect]);

  // Mouse-wheel → horizontal scroll
  useEffect(() => {
    const wrapper = scrollRef.current;
    if (!wrapper) return;
    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        wrapper.scrollBy({ left: e.deltaY * 3, behavior: 'smooth' });
      }
    };
    wrapper.addEventListener('wheel', onWheel, { passive: false });
    return () => wrapper.removeEventListener('wheel', onWheel);
  }, []);

  const scrollLeft  = useCallback(() => scrollRef.current?.scrollBy({ left: -440, behavior: 'smooth' }), []);
  const scrollRight = useCallback(() => scrollRef.current?.scrollBy({ left:  440, behavior: 'smooth' }), []);

  if (!movies || movies.length === 0) return null;

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={`content-row${hasFocusedChild ? ' focused' : ''}`}>

        {/* Row header — aligns with card start (padding matches .row-scrolling-content) */}
        <div className="row-header">
          <h3 className="row-title">{title}</h3>
          <div className="row-nav">
            <button className="row-nav-btn" onClick={scrollLeft}  aria-label="Scroll left"  tabIndex={0}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button className="row-nav-btn" onClick={scrollRight} aria-label="Scroll right" tabIndex={0}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable card track */}
        <div className="row-track" ref={scrollRef}>
          <div className="row-cards">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${id}-${movie.id || index}`}
                movie={movie}
                index={index}
                rowId={id}
                onEnterPress={onCardPress}
                onFocus={onCardFocus}
              />
            ))}
          </div>
        </div>

        {/* Edge fade — left */}
        <div className="edge-fade left" aria-hidden="true" />
        {/* Edge fade — right */}
        <div className="edge-fade right" aria-hidden="true" />

      </div>
    </FocusContext.Provider>
  );
}

export default MovieRow;
