import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

// Import Norigin Spatial Navigation
import { SpatialNavigation } from '@noriginmedia/norigin-spatial-navigation';

// Initialize Spatial Navigation Service
// Following Norigin's recommended initialization pattern
SpatialNavigation.init({
  debug: false,
  verticalGutter: 10,
  horizontalGutter: 10,
  restrictToParent: false,
  distanceCalculationMethod: 'center',
});

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);