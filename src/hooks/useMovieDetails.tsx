import { useEffect, useState } from 'react';
import axiosMovie from '../api/getMovie';
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = ( movieId: number ) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });


    const getMovieDetails = async () => {
        
        const [details, credits] = await Promise.all([
            axiosMovie.get<MovieFull>(`/${ movieId }`),
            axiosMovie.get<CreditsResponse>(`/${ movieId }/credits`)
        ]);

        setState({
            isLoading: false,
            movieFull: details.data,
            cast: credits.data.cast
        });
    }

    useEffect(() => {
       getMovieDetails();
    }, []);

    return {
        ...state
    }
}
