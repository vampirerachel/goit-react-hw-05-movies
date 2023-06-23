import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './movieDetails.module.css';
import { getMovieDetails, getMovieCredits, getMovieReviews, getMoviePoster } from './api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);

        const cast = await getMovieCredits(movieId);
        setMovieCast(cast?.cast);

        const reviews = await getMovieReviews(movieId);
        setMovieReviews(reviews?.results);
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

  const toggleCast = () => {
    setShowCast(!showCast);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className={styles.movieDetails}>
      <div className={styles.movieHeader}>
        <img
          src={posterUrl}
          alt={movieDetails.title}
          className={styles.moviePoster}
        />
        <div className={styles.movieInfo}>
          <h2 className={styles.movieTitle}>{movieDetails.title}</h2>
          <p className={styles.movieOverview}>{movieDetails.overview}</p>
          <p className={styles.movieRating}>Rating: {movieDetails.vote_average}</p>
        </div>
      </div>

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

      <div className={styles.movieSection}>
        <h3 className={styles.sectionTitle}>
          <button onClick={toggleReviews} className={styles.toggleButton}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </button>
        </h3>
        {showReviews && (
          <>
            {movieReviews.length > 0 ? (
              <ul className={styles.reviewList}>
                {movieReviews.map((review) => (
                  <li key={review.id} className={styles.reviewItem}>
                    <p className={styles.reviewAuthor}>{review.author}</p>
                    <p className={styles.reviewContent}>{review.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
