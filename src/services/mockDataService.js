/**
 * Mock Data Service
 * 
 * Provides sample movie and TV show data for the TV app.
 * In production, this would be replaced with API calls to a backend service.
 */

// Sample movie data with enhanced styling
export const mockMovies = [
  {
    id: 'movie-1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    rating: 'PG-13',
    year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    match: 98,
    duration: '2h 32m',
    gradient1: '#0d1117',
    gradient2: '#161b22',
    accentColor: '#e50914',
    progress: 0,
  },
  {
    id: 'movie-2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1jav7y4argnzKSL0CQm.jpg',
    rating: 'PG-13',
    year: 2010,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    match: 96,
    duration: '2h 28m',
    gradient1: '#1a1a2e',
    gradient2: '#16213e',
    accentColor: '#0f3460',
    progress: 45,
  },
  {
    id: 'movie-3',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    rating: 'PG-13',
    year: 2014,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    match: 95,
    duration: '2h 49m',
    gradient1: '#0a0a0f',
    gradient2: '#1a1a2e',
    accentColor: '#5c6bc0',
    progress: 0,
  },
  {
    id: 'movie-4',
    title: 'The Matrix',
    description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
    image: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    rating: 'R',
    year: 1999,
    genres: ['Action', 'Sci-Fi'],
    match: 97,
    duration: '2h 16m',
    gradient1: '#0d1a0d',
    gradient2: '#1a2d1a',
    accentColor: '#4caf50',
    progress: 78,
  },
  {
    id: 'movie-5',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    image: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dRWOcX696oMl9hCd8qWfXG2xj6l.jpg',
    rating: 'R',
    year: 1994,
    genres: ['Crime', 'Drama'],
    match: 94,
    duration: '2h 34m',
    gradient1: '#2d1a1a',
    gradient2: '#1a1a2e',
    accentColor: '#ff5722',
    progress: 0,
  },
  {
    id: 'movie-6',
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.',
    image: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7c9UVPPiTPltouxRVY6N9uugaVA.jpg',
    rating: 'PG-13',
    year: 1994,
    genres: ['Comedy', 'Drama', 'Romance'],
    match: 93,
    duration: '2h 22m',
    gradient1: '#2d2a1a',
    gradient2: '#1a2d2a',
    accentColor: '#ffc107',
    progress: 100,
  },
  {
    id: 'movie-7',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.',
    image: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    rating: 'R',
    year: 1994,
    genres: ['Crime', 'Drama'],
    match: 99,
    duration: '2h 22m',
    gradient1: '#1a1a1a',
    gradient2: '#2d2d2d',
    accentColor: '#9c27b0',
    progress: 0,
  },
  {
    id: 'movie-8',
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    image: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYUS5VpJcT7QgA9XNNXJvF.jpg',
    rating: 'R',
    year: 1999,
    genres: ['Drama', 'Thriller'],
    match: 92,
    duration: '2h 19m',
    gradient1: '#1a0f0f',
    gradient2: '#2d1a1a',
    accentColor: '#f44336',
    progress: 25,
  },
  {
    id: 'movie-9',
    title: 'Gladiator',
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.',
    image: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/6WBIzCgmDCYrqh64yDQOVsHGnKr.jpg',
    rating: 'R',
    year: 2000,
    genres: ['Action', 'Drama'],
    match: 91,
    duration: '2h 35m',
    gradient1: '#2d1f1a',
    gradient2: '#1a1a2d',
    accentColor: '#ff9800',
    progress: 0,
  },
  {
    id: 'movie-10',
    title: 'The Lion King',
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    image: 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJnrpM4v7d.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/1LRLLWGvs5sZdTzuMqLEahb88Pc.jpg',
    rating: 'PG',
    year: 1994,
    genres: ['Animation', 'Family', 'Drama'],
    match: 90,
    duration: '1h 28m',
    gradient1: '#2d2a1a',
    gradient2: '#2d1a1a',
    accentColor: '#ff5722',
    progress: 0,
  },
];

// TV Shows data
export const mockTVShows = [
  {
    id: 'show-1',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.',
    image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizMGt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5CU8etx1BHj2Zc0Ez8o.jpg',
    rating: 'TV-MA',
    year: 2008,
    genres: ['Crime', 'Drama', 'Thriller'],
    match: 99,
    seasons: 5,
    gradient1: '#1a2d1a',
    gradient2: '#0f1a0f',
    accentColor: '#8bc34a',
    progress: 60,
  },
  {
    id: 'show-2',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
    image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64Mdbb.jpg',
    rating: 'TV-14',
    year: 2016,
    genres: ['Drama', 'Fantasy', 'Horror'],
    match: 95,
    seasons: 4,
    gradient1: '#1a1a2e',
    gradient2: '#2d1a2d',
    accentColor: '#e91e63',
    progress: 0,
  },
  {
    id: 'show-3',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
    image: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8VWdTo.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/wHkTc5gWjXGQjXWJqkZP3qJZPZz.jpg',
    rating: 'TV-MA',
    year: 2016,
    genres: ['Drama', 'History'],
    match: 91,
    seasons: 6,
    gradient1: '#1a1a2d',
    gradient2: '#0f0f1a',
    accentColor: '#3f51b5',
    progress: 30,
  },
  {
    id: 'show-4',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy.',
    image: 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9ijMGlJKqcsl5lRZYz10V6n56qW.jpg',
    rating: 'TV-14',
    year: 2019,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    match: 94,
    seasons: 3,
    gradient1: '#0f1a1a',
    gradient2: '#1a2d2d',
    accentColor: '#00bcd4',
    progress: 0,
  },
  {
    id: 'show-5',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.',
    image: 'https://image.tmdb.org/t/p/w500/cZ0qJpUY2CZGxTbXdvhNLMH8y7T.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
    rating: 'TV-MA',
    year: 2019,
    genres: ['Fantasy', 'Action', 'Adventure'],
    match: 92,
    seasons: 3,
    gradient1: '#1a0f0f',
    gradient2: '#2d1a1a',
    accentColor: '#f44336',
    progress: 0,
  },
  {
    id: 'show-6',
    title: 'Wednesday',
    description: 'Follows Wednesday Addams\' years as a student at Nevermore Academy.',
    image: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cDy7WjCYQZ76J5vqjr.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    rating: 'TV-14',
    year: 2022,
    genres: ['Comedy', 'Fantasy', 'Mystery'],
    match: 90,
    seasons: 1,
    gradient1: '#0f0f1a',
    gradient2: '#1a1a2d',
    accentColor: '#9c27b0',
    progress: 85,
  },
  {
    id: 'show-7',
    title: 'The Last of Us',
    description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl.',
    image: 'https://image.tmdb.org/t/p/w500/uKVpV7509BfJSsLxqVzJLdLQXKq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPdAk29yz6ckRrWfhN8hH.jpg',
    rating: 'TV-MA',
    year: 2023,
    genres: ['Drama', 'Action', 'Sci-Fi'],
    match: 97,
    seasons: 1,
    gradient1: '#1a1a0f',
    gradient2: '#2d2d1a',
    accentColor: '#ff9800',
    progress: 0,
  },
  {
    id: 'show-8',
    title: 'House of the Dragon',
    description: 'An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys.',
    image: 'https://image.tmdb.org/t/p/w500/z2yahlguefxD0qM8mWZWTVepz9u.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/1X4h40fcB4WWUmIBKJauaiYd4C8.jpg',
    rating: 'TV-MA',
    year: 2022,
    genres: ['Fantasy', 'Drama', 'Action'],
    match: 93,
    seasons: 2,
    gradient1: '#2d0f0f',
    gradient2: '#1a0f0f',
    accentColor: '#d32f2f',
    progress: 0,
  },
];

// Featured content
export const featuredContent = {
  id: 'featured-1',
  title: 'The Dark Knight',
  description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  image: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
  rating: 'PG-13',
  year: 2008,
  genres: ['Action', 'Crime', 'Drama'],
  gradient1: '#0d1117',
  gradient2: '#161b22',
};

// Categories for rows
export const categories = [
  { id: 'trending', title: 'Trending Now', items: [...mockMovies.slice(0, 4), ...mockTVShows.slice(0, 2)] },
  { id: 'action', title: 'Action & Adventure', items: mockMovies.filter(m => m.genres.includes('Action')) },
  { id: 'scifi', title: 'Sci-Fi Movies', items: mockMovies.filter(m => m.genres.includes('Sci-Fi')) },
  { id: 'drama', title: 'Award-Winning Dramas', items: mockMovies.filter(m => m.genres.includes('Drama')) },
  { id: 'tv-shows', title: 'Top TV Shows', items: mockTVShows },
  { id: 'new', title: 'New Releases', items: [...mockMovies.slice(4, 8), ...mockTVShows.slice(2, 4)] },
];

/**
 * Get all movies
 */
export function getAllMovies() {
  return mockMovies;
}

/**
 * Get all TV shows
 */
export function getAllTVShows() {
  return mockTVShows;
}

/**
 * Get movies by genre
 */
export function getMoviesByGenre(genre) {
  return mockMovies.filter(movie =>
    movie.genres.some(g => g.toLowerCase() === genre.toLowerCase())
  );
}

/**
 * Get TV shows by genre
 */
export function getTVShowsByGenre(genre) {
  return mockTVShows.filter(show =>
    show.genres.some(g => g.toLowerCase() === genre.toLowerCase())
  );
}

/**
 * Search movies and TV shows by title
 */
export function searchContent(query) {
  const lowerQuery = query.toLowerCase();
  const movieResults = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(lowerQuery)
  );
  const showResults = mockTVShows.filter(show =>
    show.title.toLowerCase().includes(lowerQuery)
  );
  return {
    movies: movieResults,
    shows: showResults,
    all: [...movieResults, ...showResults],
  };
}

/**
 * Get featured content
 */
export function getFeaturedContent() {
  return featuredContent;
}

/**
 * Get categories with content
 */
export function getCategories() {
  return categories;
}

/**
 * Get movie by ID
 */
export function getMovieById(id) {
  return mockMovies.find(movie => movie.id === id) || null;
}

/**
 * Get TV show by ID
 */
export function getTVShowById(id) {
  return mockTVShows.find(show => show.id === id) || null;
}

/**
 * Get content by ID (movie or TV show)
 */
export function getContentById(id) {
  return getMovieById(id) || getTVShowById(id) || null;
}