import React, { useCallback, useState, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { CatalogProvider } from './contexts/CatalogContext';
import HomePage from './pages/HomePage';
import './styles/App.css';

// Import components
import SearchModal from './components/common/SearchModal';
import ProfileModal from './components/common/ProfileModal';
import { searchContent } from './services/mockDataService';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import NewPopularPage from './pages/NewPopularPage';
import MyListPage from './pages/MyListPage';

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
  const [lastFocusKey, setLastFocusKey] = useState('menu-home');

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback((query) => {
    const results = searchContent(query);
  }, []);

  const handleSignOut = useCallback(() => {
    console.log('Signing out...');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'movies':
        return <MoviesPage onRegisterFocus={setLastFocusKey} />;
      case 'series':
        return <SeriesPage onRegisterFocus={setLastFocusKey} />;
      case 'new':
        return <NewPopularPage onRegisterFocus={setLastFocusKey} />;
      case 'mylist':
        return <MyListPage onRegisterFocus={setLastFocusKey} />;
      default:
        return <HomePage onRegisterFocus={setLastFocusKey} />;
    }
  };

  // GLOBAL FOCUS RESTORATION SAFETY NET
  // This runs continuously to detect and restore focus if it becomes lost
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const activeElement = document.activeElement;
      
      // If focus is on body or lost (no element has focus)
      if (!activeElement || activeElement === document.body || !activeElement.classList.contains('focused')) {
        // Restore to last known focused element
        if (lastFocusKey) {
          console.log('[Global Safety Net] Restoring focus to:', lastFocusKey);
          setFocus(lastFocusKey);
        }
      }
    }, 200);

    return () => clearInterval(checkInterval);
  }, [lastFocusKey]);

  // Set initial focus when app mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus('menu-home');
      console.log('Initial focus set to menu-home');
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
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        onSignOut={handleSignOut}
        userProfile={{
          name: 'John Doe',
          email: 'john@example.com',
        }}
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
    onEnterPress: () => {
      if (onNavigate) {
        onNavigate();
      }
    },
    onFocus: () => {
      // Register this element as focused for global restoration
      if (onRegisterFocus) {
        onRegisterFocus(id);
      }
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