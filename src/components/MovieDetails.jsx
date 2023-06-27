import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import styles from './movieDetails.module.css';
import { getMovieDetails, getMoviePoster } from './api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
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

  return (
    <div className={styles.movieDetails}>
      <div className={styles.movieHeader}>
        <img src={posterUrl} alt={movieDetails.title} className={styles.moviePoster} />
        <div className={styles.movieInfo}>
          <h2 className={styles.movieTitle}>{movieDetails.title}</h2>
          <p className={styles.movieOverview}>{movieDetails.overview}</p>
          <p className={styles.movieRating}>Rating: {movieDetails.vote_average}</p>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
