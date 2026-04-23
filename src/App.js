import React, { useCallback, useEffect, useState } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import './styles/App.css';

// Import components
import MovieRow from './components/content/MovieRow';
import { getCategories, getFeaturedContent } from './services/mockDataService';

function App() {
  const categories = getCategories();
  const featuredContent = getFeaturedContent();

  return (
    <div className="app-container">
      {/* Main Content Area */}
      <div className="main-content">
        <div className="content-wrapper">
          <h1 className="app-title">STREAMFLIX</h1>
          
          {/* Featured Content */}
          <div className="featured-section">
            <div className="featured-card" style={{ backgroundColor: '#565b6b' }}>
              <h2 className="featured-title">{featuredContent.title}</h2>
              <p className="featured-subtitle">Press Enter to select a movie</p>
            </div>
          </div>

          {/* Movie Rows */}
          <div className="rows-container">
            {categories.map((category) => (
              <MovieRow
                key={category.id}
                id={`row-${category.id}`}
                title={category.title}
                movies={category.items}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Navigation Menu */}
      <SideMenu focusKey="SIDE-MENU" />
    </div>
  );
}

function SideMenu({ focusKey }) {
  const { ref, focusSelf, hasFocusedChild } = useFocusable({
    focusKey,
    trackChildren: true,
    isFocusBoundary: true,
    onEnterPress: () => {},
    onFocus: () => console.log('Menu focused'),
    onBlur: () => console.log('Menu blurred'),
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={`side-menu ${hasFocusedChild ? 'focused' : ''}`} ref={ref}>
        <div className="menu-logo">STREAMFLIX</div>
        <SideMenuItem id="menu-home" label="Home" />
        <SideMenuItem id="menu-movies" label="Movies" />
        <SideMenuItem id="menu-series" label="Series" />
        <SideMenuItem id="menu-new" label="New & Popular" />
        <SideMenuItem id="menu-mylist" label="My List" />
        <div className="menu-spacer" />
        <SideMenuItem id="menu-search" label="Search" icon="search" />
        <SideMenuItem id="menu-profile" label="Profile" icon="profile" />
      </div>
    </FocusContext.Provider>
  );
}

function SideMenuItem({ id, label, icon }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => console.log(`Selected: ${label}`),
    onFocus: () => console.log(`Focused: ${label}`),
  });

  return (
    <div ref={ref} className={`menu-item ${focused ? 'focused' : ''}`}>
      {icon === 'search' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      )}
      {icon === 'profile' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
      {!icon && <span className="menu-item-label">{label}</span>}
    </div>
  );
}

export default App;