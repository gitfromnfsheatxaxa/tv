import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories, getAllTVShows } from '../services/mockDataService';
import './Pages.css';

function SeriesPage({ onRegisterFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SERIES-CONTENT',
    trackChildren: true,
  });

  const tvCategories = getCategories().filter(cat =>
    cat.id === 'tv-shows' || cat.id === 'trending'
  );
  const allShows = getAllTVShows();

  const handleMovieSelect = useCallback((movie) => {
    console.log('Show selected:', movie.title);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
    <div ref={ref} className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">TV Series</h1>
        <p className="page-subtitle">Binge-watch your favorite TV shows</p>
      </div>

      <div className="page-content">
        <div className="series-hero">
          <div className="series-stats">
            <div className="stat-card">
              <span className="stat-number">{allShows.length}</span>
              <span className="stat-label">TV Shows</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Seasons</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">HD</span>
              <span className="stat-label">Quality</span>
            </div>
          </div>
        </div>

        <div className="rows-container">
          {tvCategories.map((category) => (
            <MovieRow
              key={category.id}
              id={`series-${category.id}`}
              title={category.title}
              movies={category.items}
              onMovieSelect={handleMovieSelect}
              onRegisterFocus={onRegisterFocus}
            />
          ))}
        </div>
      </div>
    </div>
    </FocusContext.Provider>
  );
}

export default SeriesPage;