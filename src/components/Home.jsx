import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "./api";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const trendingMovies = await getTrendingMovies();
            setMovies(trendingMovies);
        }
        fetchMovies();
    }, []);

    return (
        <div>
            <h2>Trending Today</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}
export default Home;