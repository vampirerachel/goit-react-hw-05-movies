import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Navigation';
import Home from './Home';
import Movie from './Movies';
import MovieDetails from './MovieDetails';
import Cast from "./Cast"
import Reviews from "./Reviews"

export const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:movieId" element={<MovieDetailsWrapper />} />
        <Route path="/movies/:movieId/cast" element={<CastWrapper />} />
        <Route path="/movies/:movieId/reviews" element={<ReviewsWrapper />} />
      </Routes>
    </div>
  );
};
function MovieDetailsWrapper() {
  const { movieId } = useParams();

  return <MovieDetails movieId={movieId} />;
}
function CastWrapper() {
  const { movieId } = useParams();

  return <Cast movieId={movieId} />;
}

function ReviewsWrapper() {
  const { movieId } = useParams();

  return <Reviews movieId={movieId} />;
}