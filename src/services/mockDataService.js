/**
 * Mock Data Service
 * 
 * Provides sample movie and TV show data for the TV app.
 * In production, this would be replaced with API calls to a backend service.
 */

// Sample movie data
export const mockMovies = [
  {
    id: 'movie-1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    rating: 'PG-13',
    year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    match: 98,
    duration: '2h 32m',
  },
  {
    id: 'movie-2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1jav7y4argnzKSL0CQm.jpg',
    rating: 'PG-13',
    year: 2010,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    match: 96,
    duration: '2h 28m',
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
  },
  {
    id: 'movie-7',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    image: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    rating: 'R',
    year: 1994,
    genres: ['Crime', 'Drama'],
    match: 99,
    duration: '2h 22m',
  },
  {
    id: 'movie-8',
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    image: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYUS5VpJcT7QgA9XNNXJvF.jpg',
    rating: 'R',
    year: 1999,
    genres: ['Drama'],
    match: 92,
    duration: '2h 19m',
  },
];

// TV Shows data
export const mockTVShows = [
  {
    id: 'show-1',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizMGt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5CU8etx1BHj2Zc0Ez8o.jpg',
    rating: 'TV-MA',
    year: 2008,
    genres: ['Crime', 'Drama', 'Thriller'],
    match: 99,
    seasons: 5,
  },
  {
    id: 'show-2',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64Mdbb.jpg',
    rating: 'TV-14',
    year: 2016,
    genres: ['Drama', 'Fantasy', 'Horror'],
    match: 95,
    seasons: 4,
  },
  {
    id: 'show-3',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    image: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8VWdTo.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/wHkTc5gWjXGQjXWJqkZP3qJZPZz.jpg',
    rating: 'TV-MA',
    year: 2016,
    genres: ['Drama', 'History'],
    match: 91,
    seasons: 6,
  },
  {
    id: 'show-4',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    image: 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9ijMGlJKqcsl5lRZYz10V6n56qW.jpg',
    rating: 'TV-14',
    year: 2019,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    match: 94,
    seasons: 3,
  },
  {
    id: 'show-5',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    image: 'https://image.tmdb.org/t/p/w500/cZ0qJpUY2CZGxTbXdvhNLMH8y7T.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
    rating: 'TV-MA',
    year: 2019,
    genres: ['Fantasy', 'Action', 'Adventure'],
    match: 92,
    seasons: 3,
  },
  {
    id: 'show-6',
    title: 'Wednesday',
    description: 'Follows Wednesday Addams\' years as a student at Nevermore Academy, where she attempts to master her emerging psychic ability.',
    image: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cDy7WjCYQZ76J5vqjr.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    rating: 'TV-14',
    year: 2022,
    genres: ['Comedy', 'Fantasy', 'Mystery'],
    match: 90,
    seasons: 1,
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