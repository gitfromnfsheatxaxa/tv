import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useFocusable, FocusContext, setFocus, getCurrentFocusKey } from '@noriginmedia/norigin-spatial-navigation';
import { CatalogProvider } from './contexts/CatalogContext';
import HomePage from './pages/HomePage';
import './styles/App.css';

// Import components
import SearchModal from './components/common/SearchModal';
import ProfileModal from './components/common/ProfileModal';
import MovieDetailModal from './components/common/MovieDetailModal';
import { searchContent } from './services/mockDataService';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import NewPopularPage from './pages/NewPopularPage';
import MyListPage from './pages/MyListPage';
import VideoPlayer from './pages/VideoPlayer';

/**
 * Main App Component
 * 
 * Wraps the entire application with CatalogProvider for dynamic hero updates.
 * Includes global focus restoration safety net.
 */
function App() {
  return (
    <CatalogProvider>
      <AppContent />
    </CatalogProvider>
  );
}

/**
 * App Content - Contains the actual app logic with global focus restoration
 */
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);
  const [lastFocusKey, setLastFocusKey] = useState('menu-home');
  const [lastFocusedPage, setLastFocusedPage] = useState('home');
  const [preModalFocusKey, setPreModalFocusKey] = useState(null);
  // FIX (Layer 2 — recover): always holds the last key confirmed valid by getCurrentFocusKey().
  // Menu keys are used on page change so the ref never points to an unmounted card.
  const lastValidFocusRef = useRef('menu-home');

  const handlePageChange = useCallback((page) => {
    setLastFocusedPage(currentPage);
    setCurrentPage(page);
    // FIX: Reset recovery ref to a menu key that is guaranteed to be mounted on the new page.
    // Without this, lastValidFocusRef still holds a card key (e.g. CARD-row-trending-movie-1).
    // When the old page unmounts those cards are gone; the rAF guard would call setFocus()
    // on a non-existent key, Norigin silently fails, and focus stays null permanently.
    lastValidFocusRef.current = `menu-${page}`;
    setTimeout(() => {
      setFocus(`menu-${page}`);
    }, 100);
  }, [currentPage]);

  const handleSearch = useCallback((query) => {
    const results = searchContent(query);
    console.log('Search results:', results);
  }, []);

  const handleSignOut = useCallback(() => {
    console.log('Signing out...');
  }, []);

  // Handle movie selection - opens detail modal
  const handleMovieSelect = useCallback((movie) => {
    // FIX: Save exact Norigin focus key before modal opens so it can be restored on close.
    // Previous code reconstructed the key (CARD-row-trending-0) which was wrong — movie IDs
    // are strings like 'movie-1', making the real key CARD-row-trending-movie-1.
    setPreModalFocusKey(getCurrentFocusKey());
    setSelectedMovie(movie);
    setIsMovieDetailOpen(true);
  }, []);

  // Handle playing a movie - navigate to video player
  const handlePlayMovie = useCallback((movie) => {
    console.log('Playing:', movie.title);
    // Close detail modal and navigate to player page
    setIsMovieDetailOpen(false);
    setSelectedMovie(movie);
    setCurrentPage('player');
    // Store the page we came from for back navigation
    setLastFocusedPage('detail');
  }, []);

  // Close movie detail modal and restore focus to the card that opened it
  const handleCloseMovieDetail = useCallback(() => {
    setIsMovieDetailOpen(false);
    if (preModalFocusKey) {
      setTimeout(() => setFocus(preModalFocusKey), 100);
    }
  }, [preModalFocusKey]);

  // Handle back from video player
  const handlePlayerBack = useCallback(() => {
    setCurrentPage(lastFocusedPage === 'detail' ? 'home' : lastFocusedPage);
    setSelectedMovie(null);
    setTimeout(() => {
      setFocus(`menu-${lastFocusedPage}`);
    }, 100);
  }, [lastFocusedPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'movies':
        return <MoviesPage onRegisterFocus={setLastFocusKey} onMovieSelect={handleMovieSelect} />;
      case 'series':
        return <SeriesPage onRegisterFocus={setLastFocusKey} onMovieSelect={handleMovieSelect} />;
      case 'new':
        return <NewPopularPage onRegisterFocus={setLastFocusKey} onMovieSelect={handleMovieSelect} />;
      case 'mylist':
        return <MyListPage onRegisterFocus={setLastFocusKey} onMovieSelect={handleMovieSelect} />;
      case 'player':
        return <VideoPlayer movie={selectedMovie} onBack={handlePlayerBack} />;
      default:
        return <HomePage onRegisterFocus={setLastFocusKey} onMovieSelect={handleMovieSelect} />;
    }
  };

  // FIX (Layer 2 — recover): event-driven focus guard.
  // Replaces the broken polling safety net (setInterval every 200ms) which checked
  // document.activeElement.classList.contains('focused') — that class is managed by React
  // state, not the DOM, so the check was always true and setFocus fired constantly,
  // overriding every navigation the user attempted.
  //
  // This version fires only on actual keypresses. requestAnimationFrame defers until after
  // Norigin has synchronously processed the key event and updated currentFocusKey.
  // - If a valid key exists  → save it to lastValidFocusRef (keep ref fresh)
  // - If key is null (escaped) → restore from lastValidFocusRef (guaranteed mounted)
  useEffect(() => {
    const onKeyDown = () => {
      requestAnimationFrame(() => {
        const key = getCurrentFocusKey();
        if (key) {
          lastValidFocusRef.current = key;
        } else if (lastValidFocusRef.current) {
          setFocus(lastValidFocusRef.current);
        }
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Set initial focus when app mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      lastValidFocusRef.current = 'menu-home';
      setFocus('menu-home');
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {/* Left Side Navigation Menu - Collapsible */}
      <SideMenu 
        focusKey="SIDE-MENU" 
        currentPage={currentPage}
        onNavigate={handlePageChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onRegisterFocus={setLastFocusKey}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {renderPage()}
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => {
          setIsSearchOpen(false);
          // Restore focus to search button
          setTimeout(() => setFocus('menu-search'), 100);
        }}
        onSearch={handleSearch}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => {
          setIsProfileOpen(false);
          // Restore focus to profile button
          setTimeout(() => setFocus('menu-profile'), 100);
        }}
        onSignOut={handleSignOut}
        userProfile={{
          name: 'John Doe',
          email: 'john@example.com',
        }}
      />

      {/* Movie Detail Modal */}
      <MovieDetailModal
        isOpen={isMovieDetailOpen}
        onClose={handleCloseMovieDetail}
        movie={selectedMovie}
        onPlay={handlePlayMovie}
      />
    </div>
  );
}

function SideMenu({ focusKey, currentPage, onNavigate, onOpenSearch, onOpenProfile, onRegisterFocus }) {
  const { ref, hasFocusedChild } = useFocusable({
    focusKey,
    trackChildren: true,
  });

  const handleNavigation = useCallback((page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  }, [onNavigate]);

  const menuItems = [
    { id: 'menu-home', label: 'Home', icon: 'home', page: 'home' },
    { id: 'menu-movies', label: 'Movies', icon: 'film', page: 'movies' },
    { id: 'menu-series', label: 'Series', icon: 'tv', page: 'series' },
    { id: 'menu-new', label: 'New & Popular', icon: 'trending', page: 'new' },
    { id: 'menu-mylist', label: 'My List', icon: 'plus', page: 'mylist' },
  ];

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={`side-menu ${hasFocusedChild ? 'focused' : ''}`} ref={ref}>
        <div className="menu-header">
          <div className="menu-logo">
            <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#E50914"/>
              <path d="M12 10L28 20L12 30V10Z" fill="white"/>
            </svg>
            <span className="menu-logo-text">STREAMFLIX</span>
          </div>
        </div>
        
        <div className="menu-items">
          {menuItems.map((item) => (
            <SideMenuItem 
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={currentPage === item.page}
              onNavigate={() => handleNavigation(item.page)}
              onRegisterFocus={onRegisterFocus}
            />
          ))}
        </div>

        <div className="menu-footer">
          <SideMenuItem 
            id="menu-search" 
            label="Search" 
            icon="search" 
            onNavigate={onOpenSearch}
            onRegisterFocus={onRegisterFocus}
          />
          <SideMenuItem 
            id="menu-profile" 
            label="Profile" 
            icon="profile" 
            onNavigate={onOpenProfile}
            onRegisterFocus={onRegisterFocus}
          />
        </div>
      </div>
    </FocusContext.Provider>
  );
}

function SideMenuItem({ id, label, icon, isActive, onNavigate, onRegisterFocus }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => { if (onNavigate) onNavigate(); },
    onFocus: () => { if (onRegisterFocus) onRegisterFocus(id); },
    // FIX: Focus-loss prevention (Layer 1 — prevent).
    // LEFT: sidebar is the leftmost element of the entire app — nothing exists to its left.
    // UP at 'menu-home': topmost sidebar item, nothing above it.
    // DOWN at 'menu-profile': bottommost sidebar item, nothing below it.
    // Without these guards Norigin nulls currentFocusKey and navigation dies.
    onArrowPress: (direction) => {
      if (direction === 'left') return false;
      if (direction === 'up' && id === 'menu-home') return false;
      if (direction === 'down' && id === 'menu-profile') return false;
      return true;
    },
  });

  const icons = {
    home: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    film: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
      </svg>
    ),
    tv: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
      </svg>
    ),
    trending: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    ),
    profile: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  };

  return (
    <div 
      ref={ref} 
      className={`menu-item ${focused ? 'focused' : ''} ${isActive ? 'active' : ''}`}
    >
      <div className="menu-item-icon">{icons[icon]}</div>
      <span className="menu-item-label">{label}</span>
      {isActive && <div className="menu-item-active-indicator" />}
    </div>
  );
}

export default App;