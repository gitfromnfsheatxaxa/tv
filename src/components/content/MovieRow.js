import React, { useCallback, useRef } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import './MovieRow.css';
import MovieCard from './MovieCard';

function MovieRow({ id, title, movies }) {
  const { ref, focusKey } = useFocusable({
    focusKey: id,
    onFocus: (layout) => {
      console.log(`Row ${title} focused`, layout);
    },
  });

  const scrollingRef = useRef(null);

  const onCardFocus = useCallback(
    ({ x }) => {
      if (scrollingRef.current) {
        scrollingRef.current.scrollTo({
          left: x,
          behavior: 'smooth',
        });
      }
    },
    [scrollingRef]
  );

  const onCardPress = useCallback((movie) => {
    console.log('Selected movie:', movie.title);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-row">
        <div className="row-title">{title}</div>
        <div className="row-scrolling-wrapper" ref={scrollingRef}>
          <div className="row-scrolling-content">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id || index}
                movie={movie}
                index={index}
                onEnterPress={onCardPress}
                onFocus={onCardFocus}
              />
            ))}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default MovieRow;