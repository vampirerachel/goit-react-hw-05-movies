import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMoviePoster } from './api';
import styles from './movieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.log('Error fetching movie details:', error);
      }
    };
    fetchDetails();
  }, [movieId]);
  
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const posterUrl = getMoviePoster(movieDetails.poster_path);

  console.log('posterPath:', movieDetails.poster_path);
  console.log('posterUrl:', posterUrl);

  return (
    <div className={styles.movieDetails}>
      <img
        src={posterUrl}
        alt={movieDetails.title}
        className={styles.moviePoster}
      />
      <div className={styles.movieInfo}>
        <h2 className={styles.movieTitle}>{movieDetails.title}</h2>
        <p className={styles.movieOverview}>{movieDetails.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
