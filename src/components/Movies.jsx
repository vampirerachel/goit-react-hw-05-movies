import React, { useState } from 'react';
import { searchMovies } from './api';
import { Link } from 'react-router-dom';
const Movies = () => {
const [searchTerm, setSearchTerm] = useState('');
const [movieData, setMovieData] = useState(null);
const [isLoading, setIsLoading] = useState(false);


  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      try {
        setIsLoading(true);
        const response = await searchMovies(searchTerm);
        setMovieData(response.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    } else {
      setMovieData([]);
    }
  };

  return (
    <div>
      <h2>Movie Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a movie keyword"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {movieData && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {movieData.map((movie) => (
                <li key={movie.id}>
                             <Link to={`/movies/${movie.id}`}>
              <h3>{movie.title}</h3>
            </Link>
             </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movies;

