import React from "react";
import axios from "axios";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Movie = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;

  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovie, setTopMovie] = useState([]);
  const [upMovie, setUpMovie] = useState([]);

  const getPopularMovie = async () => {
    const popular = await axios.get(
      `${baseURL}/movie/popular?page=1&api_key=${apiKey}`
    );
    const limitedPopularMovie = popular.data.results.slice(0, 6);
    setPopularMovies(limitedPopularMovie);
    // console.log(movie.data.results);
  };

  const getTopMovie = async () => {
    const top = await axios.get(
      `${baseURL}/movie/top_rated?page=1&api_key=${apiKey}`
    );
    const limitedTopMovie = top.data.results.slice(0, 6);
    setTopMovie(limitedTopMovie);
    // console.log(movie.data.results);
  };

  const getUpMovie = async () => {
    const up = await axios.get(
      `${baseURL}/movie/upcoming?page=1&api_key=${apiKey}`
    );
    const limitedUpMovie = up.data.results.slice(0, 6);
    setUpMovie(limitedUpMovie);
    // console.log(movie.data.results);
  };

  useEffect(() => {
    getPopularMovie();
    getTopMovie();
    getUpMovie();
  }, []);

  return (
    <div className="py-4 justify-center text-sm bg-gray-900 min-h-screen">
      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>POPULAR MOVIE</h1>
        <h1
          className="cursor-pointer underline italic text-yellow-300 hover:text-blue-500"
          onClick={() => navigate("/pagemovie/popular")}>
          Others...
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {popularMovies.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>TTOP RAITING MOVIE</h1>
        <h1
          className="cursor-pointer underline italic text-yellow-300 hover:text-blue-500"
          onClick={() => navigate("/pagemovie/top")}>
          Others...
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {topMovie.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>UP COMMING MOVIE</h1>
        <h1
          className="cursor-pointer underline italic text-yellow-300 hover:text-blue-500"
          onClick={() => navigate("/pagemovie/up")}>
          Others...
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {upMovie.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default Movie;
