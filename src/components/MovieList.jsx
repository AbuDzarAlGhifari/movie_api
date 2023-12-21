import React from "react";
import axios from "axios";
import Card from "./Card";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieList = () => {
  // const navigate = useNavigate();
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;

  const [popularMovies, setPopularMovies] = useState([]);

  const getMovieList = async () => {
    const movie = await axios.get(
      `${baseURL}/movie/popular?page=1&api_key=${apiKey}`
    );
    const limitedPopularMovie = movie.data.results.slice(0, 12);
    setPopularMovies(limitedPopularMovie);
    // console.log(movie.data.results);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="py-4 justify-center text-sm bg-gray-800 min-h-screen">
      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white">
        <h1>Popular Movie</h1>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {popularMovies.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MovieList;
