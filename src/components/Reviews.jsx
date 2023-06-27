import React, { useState, useEffect } from 'react';
import styles from './movieDetails.module.css';
import { getMovieReviews } from './api';
import MovieDetails from './MovieDetails';

const Reviews = ({ movieId }) => {
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getMovieReviews(movieId);
        setMovieReviews(reviews?.results);
      } catch (error) {
        console.log('Error fetching movie reviews:', error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.movieSection}>
      <MovieDetails movieId={movieId} />
      <h3 className={styles.sectionTitle}> Reviews
      </h3>
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
      
    </div>
  );
};

export default Reviews;
