import React, { useState, useEffect } from 'react';
import styles from './movieDetails.module.css';
import { getMovieReviews } from './api';

const Reviews = ({ movieId }) => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

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
  );
};

export default Reviews;
