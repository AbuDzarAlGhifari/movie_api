import React from "react";
import { getMovieList, searchMovie } from "../components/api";
import { useEffect, useState } from "react";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div
          className="bg-gray-900 p-3 rounded-2xl shadow-lg hover:-translate-y-1 border-2 border-gray-200 "
          key={i}>
          <img
            className="rounded-lg w-full h-full mb-2 "
            src={`${import.meta.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="text-xl text-white font-bold text-center ">
            {movie.title}
          </div>
          <div className="text-sm text-gray-300 font-medium text-center">
            Release : {movie.release_date}
          </div>
          <div className="text-sm text-red-700 font-bold text-center">
            {movie.vote_average}
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="bg-gray-600">
      <div className="input flex justify-center  px-5 lg:px-0 py-5">
        <input
          placeholder="Cari film...."
          className="shadow-md bg-gray-200 placeholder-gray-400 rounded-lg 
            px-2 py-2 outline-none border-2 border-gray-500 text-black text-center"
          onChange={({ target }) => search(target.value)}
        />
      </div>

      <div className="Movie-container">
        <PopularMovieList />
      </div>
    </div>
  );
};

export default Home;
