import { useEffect, useState } from "react"
import axiosMovie from '../api/getMovie';
import { MovieResponse, Movie } from '../interfaces/movieInterface';


interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRaded: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRaded: [],
        upcoming: []
    });

    const getMovies = async () => {

        const [respNowPlaying, respPopular, respTopRated, respUpcoming] = await Promise.all([
            axiosMovie.get<MovieResponse>('/now_playing'),
            axiosMovie.get<MovieResponse>('/popular'),
            axiosMovie.get<MovieResponse>('/top_rated'),
            axiosMovie.get<MovieResponse>('/upcoming')
        ]);
        
        setMoviesState({
            nowPlaying: respNowPlaying.data.results,
            popular: respPopular.data.results,
            topRaded: respTopRated.data.results,
            upcoming: respUpcoming.data.results
        });
        setIsLoading(false);
    }
    
    useEffect(() => {
       getMovies();
    }, []);

    return {
        ...moviesState,
        isLoading
    }
}
