import React, { useState, useCallback } from 'react';
import NavBar from '../components/layout/NavBar';
import FeaturedHero from '../components/content/FeaturedHero';
import MovieRow from '../components/content/MovieRow';
import { getFeaturedContent, getCategories } from '../services/mockDataService';
import './HomePage.css';

/**
 * HomePage Component
 * 
 * Main landing page for the TV app featuring:
 * - Featured content hero
 * - Multiple movie/TV show rows
 * - Navigation bar
 */
function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const featuredContent = getFeaturedContent();
  const categories = getCategories();

  const handlePlayMovie = useCallback((movie) => {
    console.log('Playing movie:', movie.title);
    setSelectedMovie(movie);
    // In production, this would start video playback
  }, []);

  const handleMoreInfo = useCallback((movie) => {
    console.log('More info for:', movie.title);
    setSelectedMovie(movie);
    // In production, this would open a movie detail modal
  }, []);

  const handleSelectMovie = useCallback((movie) => {
    console.log('Selected movie:', movie.title);
    setSelectedMovie(movie);
  }, []);

  const handleMovieHover = useCallback((movie) => {
    setHoveredMovie(movie);
  }, []);

  const handleSearchToggle = useCallback(() => {
    console.log('Toggle search');
    // In production, this would open the search modal
  }, []);

  const handleNavigate = useCallback((item) => {
    console.log('Navigating to:', item.path);
    // In production, this would handle navigation
  }, []);

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <NavBar
        onNavigate={handleNavigate}
        onSearchToggle={handleSearchToggle}
      />

      {/* Main Content */}
      <main className="home-content">
        {/* Featured Hero Section */}
        <FeaturedHero
          movie={featuredContent}
          onPlay={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />

        {/* Movie Rows */}
        <div className="home-rows">
          {categories.map((category) => (
            <MovieRow
              key={category.id}
              id={category.id}
              title={category.title}
              movies={category.items}
              onSelectMovie={handleSelectMovie}
              onMovieHover={handleMovieHover}
            />
          ))}
        </div>
      </main>

      {/* Hover Preview (shown when hovering a movie) */}
      {hoveredMovie && (
        <div className="hover-preview" aria-hidden="true">
          <div className="hover-preview-content">
            <h4>{hoveredMovie.title}</h4>
            <p>{hoveredMovie.year} • {hoveredMovie.rating}</p>
            {hoveredMovie.match && (
              <p className="match-text">{hoveredMovie.match}% Match</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;