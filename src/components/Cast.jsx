import React, { useState, useEffect } from 'react';
import styles from './movieDetails.module.css';
import { getMovieCredits } from './api';
import MovieDetails from './MovieDetails';

const Cast = ({ movieId }) => {
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const cast = await getMovieCredits(movieId);
        setMovieCast(cast?.cast);
      } catch (error) {
        console.log('Error fetching movie cast:', error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.movieSection}>
      <MovieDetails movieId={movieId} />
      <h3 className={styles.sectionTitle}>Cast
      </h3>
      <div className={styles.castList}>
        {movieCast.map((actor) => (
          <div key={actor.id} className={styles.castItem}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.castImage}
              />
            )}
            <p className={styles.castName}>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;

