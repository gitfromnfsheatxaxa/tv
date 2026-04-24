import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories } from '../services/mockDataService';
import './Pages.css';

function NewPopularPage({ onRegisterFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'POPULAR-CONTENT',
    trackChildren: true,
  });

  const categories = getCategories();

  const handleMovieSelect = useCallback((movie) => {
    console.log('Content selected:', movie.title);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
    <div ref={ref} className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">New & Popular</h1>
        <p className="page-subtitle">Discover what's trending now</p>
      </div>

      <div className="page-content">
        <div className="popular-hero">
          <div className="trending-badge">
            <span className="badge-icon">🔥</span>
            <span className="badge-text">Trending Now</span>
          </div>
        </div>

        <div className="rows-container">
          {categories.map((category) => (
            <MovieRow
              key={category.id}
              id={`popular-${category.id}`}
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

export default NewPopularPage;