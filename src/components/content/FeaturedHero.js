import React from 'react';
import Focusable from '../common/Focusable';
import Button from '../common/Button';
import './FeaturedHero.css';

/**
 * FeaturedHero Component
 * 
 * Large featured content banner at the top of the home page.
 * Displays a prominent movie/show with title, description, and action buttons.
 */
function FeaturedHero({ movie, onPlay, onMoreInfo }) {
  if (!movie) {
    return null;
  }

  const { id, title, description, image, rating, year, genres } = movie;

  return (
    <section className="featured-hero" aria-label="Featured content">
      {/* Background Image with Gradient Overlay */}
      <div className="featured-background">
        <img
          src={image}
          alt=""
          className="featured-background-image"
        />
        <div className="featured-gradient-top" />
        <div className="featured-gradient-bottom" />
        <div className="featured-gradient-left" />
      </div>

      {/* Content */}
      <div className="featured-content">
        {/* Title */}
        <h1 className="featured-title">{title}</h1>

        {/* Metadata */}
        <div className="featured-meta">
          <span className="featured-rating">{rating}</span>
          <span className="featured-year">{year}</span>
          {genres && genres.length > 0 && (
            <span className="featured-genres">{genres.join(' • ')}</span>
          )}
        </div>

        {/* Description */}
        <p className="featured-description">{description}</p>

        {/* Action Buttons */}
        <div className="featured-actions">
          <Button
            id={`featured-play-${id}`}
            variant="primary"
            size="large"
            onSelect={() => onPlay && onPlay(movie)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </Button>

          <Button
            id={`featured-info-${id}`}
            variant="secondary"
            size="large"
            onSelect={() => onMoreInfo && onMoreInfo(movie)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            More Info
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedHero;