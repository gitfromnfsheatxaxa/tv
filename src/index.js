import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

// Import Norigin Spatial Navigation
import { SpatialNavigation } from '@noriginmedia/norigin-spatial-navigation';

// Initialize Spatial Navigation Service
// This must be done before rendering any focusable components
SpatialNavigation.init({
  debug: false, // Set to true for debugging navigation
  verticalGutter: 10, // Vertical spacing between focusable elements
  horizontalGutter: 10, // Horizontal spacing between focusable elements
  restrictToParent: false, // Allow navigation outside parent containers
});

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);