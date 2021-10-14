import axios from "axios";

const axiosMovie = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '6e20d3d3a053c57671c06c25326a18ad',
        language: 'es-ES'
    }
});

export default axiosMovie;