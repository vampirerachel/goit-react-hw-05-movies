import React, { useState, useEffect } from 'react';
import styles from './movieDetails.module.css';
import { getMovieCredits } from './api';

const Cast = ({ movieId }) => {
  const [movieCast, setMovieCast] = useState([]);
  const [showCast, setShowCast] = useState(false);

  const toggleCast = () => {
    setShowCast(!showCast);
  };

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
      <h3 className={styles.sectionTitle}>
        <button onClick={toggleCast} className={styles.toggleButton}>
          {showCast ? 'Hide Cast' : 'Show Cast'}
        </button>
      </h3>
      {showCast && (
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
      )}
    </div>
  );
};

export default Cast;
