import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './MovieCard.css';

function MovieCard({ movie, index, onEnterPress, onFocus }) {
  const { ref, focused } = useFocusable({
    onEnterPress: () => {
      if (onEnterPress) {
        onEnterPress(movie);
      }
    },
    onFocus: (layout) => {
      if (onFocus) {
        onFocus({ x: layout.x - 100, y: layout.y });
      }
    },
    extraProps: {
      title: movie.title,
      color: movie.color,
    },
  });

  return (
    <div ref={ref} className={`movie-card ${focused ? 'focused' : ''}`}>
      <div className="movie-image" style={{ backgroundColor: movie.color || '#333' }}>
        {movie.image ? (
          <img src={movie.image} alt={movie.title} className="movie-poster" />
        ) : (
          <span className="movie-placeholder">{index + 1}</span>
        )}
      </div>
      <div className="movie-info">
        <h4 className="movie-title">{movie.title}</h4>
        {movie.rating && <span className="movie-rating">{movie.rating}</span>}
        {movie.match && <span className="movie-match">{movie.match}% Match</span>}
      </div>
    </div>
  );
}

export default MovieCard;