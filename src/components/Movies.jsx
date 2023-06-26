import React, { useState, useEffect } from 'react';
import { searchMovies } from './api';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Notiflix from 'notiflix';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    if (searchParams.get('query') !== null) {
      const newQuery = searchParams.get('query');
      searchMovies(newQuery)
        .then((data) => {
          setMovieData(data.results);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, [searchParams]);

  useEffect(() => {
  }, [movieData]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const newQuery = event.target.elements.query.value.toLowerCase();

    if (newQuery.trim() === '') {
      Notiflix.Notify.info('Please enter a movie keyword');
      return;
    }
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <h2>Movie Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Enter a movie keyword"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h3>Search Results:</h3>
        {movieData.length > 0 ? (
          <ul>
            {movieData.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <h3>{movie.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No search results found.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
