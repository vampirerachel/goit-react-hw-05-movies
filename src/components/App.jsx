import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Navigation';
import Home from './Home';
import Movie from './Movies';
import MovieDetails from './MovieDetails';

export const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<Route path="/movies" element={<Movie />} />
        <Route path="/movies/:movieId" element={<MovieDetailsWrapper />} />

      </Routes>
    </div>
  );
};
function MovieDetailsWrapper() {
  const { movieId } = useParams();

  return <MovieDetails movieId={movieId} />;
}





