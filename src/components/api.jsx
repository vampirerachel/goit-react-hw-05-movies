import axios from 'axios';
const apiKey  = '2bd5b9ad35b505d5cefbe556a85eab6a';

export async function getTrendingMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}
export async function searchMovies(keyword) {
  const apiKey = '2bd5b9ad35b505d5cefbe556a85eab6a';
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&api_key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Error searching movies');
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export async function getMovieCredits(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
}

export async function getMovieReviews(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
}
export function getMoviePoster(posterPath) {
  if (!posterPath) {
    return null;
  }
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

