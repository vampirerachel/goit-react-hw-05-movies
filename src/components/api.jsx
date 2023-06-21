import axios from "axios";

export const getTrendingMovies = async () => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=2bd5b9ad35b505d5cefbe556a85eab6a`
        );
        return response.data.results;
    } catch (error) {
        console.log('error fetching trending movie', error)
        return [];
    };
};
