import React, { useState, useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories } from '../services/mockDataService';
import './Pages.css';

function MyListPage({ onRegisterFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'MYLIST-CONTENT',
    trackChildren: true,
  });
  // In a real app, this would come from user's saved list
  const [myList] = useState(() => {
    const allCategories = getCategories();
    return allCategories.flatMap(cat => cat.items).slice(0, 12);
  });

  const myListCategory = {
    id: 'my-list',
    title: 'My List',
    items: myList
  };

  const recentCategory = {
    id: 'recent',
    title: 'Recently Added',
    items: myList.slice(0, 8)
  };

  const handleMovieSelect = useCallback((movie) => {
    console.log('My List item selected:', movie.title);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
    <div ref={ref} className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">My List</h1>
        <p className="page-subtitle">Your personalized collection</p>
      </div>

      <div className="page-content">
        {myList.length > 0 ? (
          <>
            <div className="mylist-hero">
              <div className="list-stats">
                <span className="list-count">{myList.length} items</span>
              </div>
            </div>

            <div className="rows-container">
              <MovieRow
                id="mylist-main"
                title="Your List"
                movies={myListCategory.items}
                onMovieSelect={handleMovieSelect}
                onRegisterFocus={onRegisterFocus}
              />
              <MovieRow
                id="mylist-recent"
                title="Recently Added"
                movies={recentCategory.items}
                onMovieSelect={handleMovieSelect}
                onRegisterFocus={onRegisterFocus}
              />
            </div>
          </>
        ) : (
          <div className="empty-list">
            <div className="empty-icon">+</div>
            <h2>Your list is empty</h2>
            <p>Browse movies and series to add them to your list</p>
          </div>
        )}
      </div>
    </div>
    </FocusContext.Provider>
  );
}

export default MyListPage;