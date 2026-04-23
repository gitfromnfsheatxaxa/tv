import React from 'react';
import HomePage from './pages/HomePage';
import './styles/global.css';

/**
 * App Component
 * 
 * Root component for the TV Movie Streaming App.
 * Initializes the main layout and routing.
 */
function App() {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
}

export default App;