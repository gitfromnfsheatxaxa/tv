import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories, getAllMovies } from '../services/mockDataService';
import './Pages.css';

function MoviesPage({ onRegisterFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'MOVIES-CONTENT',
    trackChildren: true,
  });

  const categories = getCategories().filter(cat =>
    cat.id !== 'tv-shows' && cat.id !== 'new'
  );
  const allMovies = getAllMovies();

  const handleMovieSelect = useCallback((movie) => {
    console.log('Movie selected:', movie.title);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
    <div ref={ref} className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Movies</h1>
        <p className="page-subtitle">Browse our extensive collection of movies</p>
      </div>

      <div className="page-content">
        <div className="movies-hero">
          <div className="movies-stats">
            <div className="stat-card">
              <span className="stat-number">{allMovies.length}</span>
              <span className="stat-label">Total Movies</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">98%</span>
              <span className="stat-label">Top Rated</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Streaming</span>
            </div>
          </div>
        </div>

        <div className="rows-container">
          {categories.map((category) => (
            <MovieRow
              key={category.id}
              id={`movies-${category.id}`}
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

export default MoviesPage;