import axios from "axios";

export const getTrendingMovies = async () => {
try {
const response = await axios.get(
`https://api.themoviedb.org/3/trending/movie/day?api_key=2bd5b9ad35b505d5cefbe556a85eab6a`
);
return response.data.results;
} catch (error) {
console.log('error fetching trending movie', error)
return [];
};
};

const API_KEY = '2bd5b9ad35b505d5cefbe556a85eab6a'; // Replace with your actual API key

export const getMovieDetails = async (movieId) => {
const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
try {
    const response = await axios.get(url);
    const movieDetails = response.data;
    const posterPath = movieDetails.poster_path;
    if (posterPath) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    movieDetails.posterUrl = posterUrl;
    }
    return movieDetails;
} catch (error) {
    throw new Error('Failed to fetch movie details: ' + error.message);
}
};
export const getMoviePoster = (path) => {
  if (!path) {
    return null;
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};