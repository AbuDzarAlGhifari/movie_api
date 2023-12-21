import axios from "axios";

const apiKey = import.meta.env.REACT_APP_APIKEY
const baseURL = import.meta.env.REACT_APP_BASEURL

export const getMovieList = async() => {
    const movie = await axios.get(`${baseURL}/movie/popular?page=1&api_key=${apiKey}`)
    // console.log(movie.data.results)
    return movie.data.results
}

export const searchMovie = async(q) => {
    const search = await axios.get(
        `${baseURL}/search/movie?query=${q}&page=1&api_key=${apiKey}`
    )
    return search.data
}



