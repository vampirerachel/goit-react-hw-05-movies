import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies} from './api'; 

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
}, []);

const fetchTrendingMovies = async () => {
    try {
    const trendingMovies = await getTrendingMovies();
    setMovies(trendingMovies);
    } catch (error) {
    console.error('Error fetching trending movies:', error);
    }
};

return (
    <div>
    <h2>Trending Today</h2>
    <ul>
        {movies.map((movie) => (
        <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
            <h3>{movie.title}</h3>
            </Link>
        </li>
        ))}
    </ul>
    </div>
);
};

export default Home;
