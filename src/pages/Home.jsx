import React from "react";
import HomeLama from "./HomeLama";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;

  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovie, setTopMovie] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [topTv, setTopTv] = useState([]);

  const getPopularMovie = async () => {
    const popular = await axios.get(
      `${baseURL}/movie/popular?page=1&api_key=${apiKey}`
    );
    const limitedPopularMovie = popular.data.results.slice(0, 10);
    setPopularMovies(limitedPopularMovie);
    // console.log(movie.data.results);
  };

  const getTopMovie = async () => {
    const top = await axios.get(
      `${baseURL}/movie/top_rated?page=1&api_key=${apiKey}`
    );
    const limitedTopMovie = top.data.results.slice(0, 10);
    setTopMovie(limitedTopMovie);
    // console.log(movie.data.results);
  };

  const getPopularTv = async () => {
    const popular = await axios.get(
      `${baseURL}/tv/popular?page=1&api_key=${apiKey}`
    );
    const limitedPopularTv = popular.data.results.slice(0, 10);
    setPopularTv(limitedPopularTv);
    // console.log(limitedPopularTv);
  };

  const getTopTv = async () => {
    const popular = await axios.get(
      `${baseURL}/tv/top_rated?page=1&api_key=${apiKey}`
    );
    const limitedTopTv = popular.data.results.slice(0, 10);
    setTopTv(limitedTopTv);
    // console.log(limitedPopularTv);
  };

  const scrollContainerRef = useRef(null);

  const scrollToNextPoster = () => {
    if (scrollContainerRef.current) {
      const posterWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollLeft += posterWidth;
    }
  };

  const scrollToPreviousPoster = () => {
    if (scrollContainerRef.current) {
      const posterWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollLeft -= posterWidth;
    }
  };

  useEffect(() => {
    getPopularMovie();
    getPopularTv();
    getTopMovie();
    getTopTv();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollToNextPoster();
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="justify-center pb-5 text-sm bg-gray-800 min-h-screen">
      <div className="scroll-container scrollbar-hide" ref={scrollContainerRef}>
        {popularMovies.map((movie) => (
          <div
            key={movie.id}
            className="w-full max-h-40 sm:max-h-[200px] md:max-h-[265px] lg:max-h-[450px] relative flex-shrink-0 scroll-snap-align-start">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="backdrop"
              className="w-full h-full object-cover object-top opacity-40"
            />
            <div className="icon-container">
              <div className="icon" onClick={scrollToPreviousPoster}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div className="icon" onClick={scrollToNextPoster}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3 pt-2 lg:pt-4 px-4 justify-between text-white font-poppins text-xs sm:text-sm lg:text-lg">
        <h1>Popular Tv Series</h1>
        <h1
          className="cursor-pointer underline text-yellow-300 hover:text-blue-400"
          onClick={() => navigate("/pagemovie/popular")}>
          Lainnya..
        </h1>
      </div>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5 lg:mb-4">
        {popularTv.map((tv) => (
          <Link to={`/tv/${tv.id}`}>
            <div
              className="w-24 sm:w-32 lg:w-48 cursor-pointer rounded-lg m-1 lg:m-3 transition-all"
              key={tv.id}>
              <div className="flex justify-center items-center">
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/original/${tv.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={tv.title}
                  className="rounded-xl sm:w-full lg:w-full h-36 sm:h-48 lg:h-80 p-1 hover:p-0"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3 pt-2 lg:pt-4 px-4 justify-between text-white font-poppins text-xs sm:text-sm lg:text-lg">
        <h1>Top Raiting Movies</h1>
        <h1
          className="cursor-pointer underline text-yellow-300 hover:text-blue-400"
          onClick={() => navigate("/pagemovie/popular")}>
          Lainnya..
        </h1>
      </div>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5 lg:mb-4">
        {topMovie.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div
              className="w-24 sm:w-32 lg:w-48 cursor-pointer rounded-lg m-1 lg:m-3 transition-all"
              key={movie.id}>
              <div className="flex justify-center items-center">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.title}
                  className="rounded-xl sm:w-full lg:w-full h-36 sm:h-48 lg:h-80 p-1 hover:p-0"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3 pt-2 lg:pt-4 px-4 justify-between text-white font-poppins text-xs sm:text-sm lg:text-lg">
        <h1>Top Raiting Tv Series</h1>
        <h1
          className="cursor-pointer underline text-yellow-300 hover:text-blue-400"
          onClick={() => navigate("/pagemovie/popular")}>
          Lainnya..
        </h1>
      </div>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5 lg:mb-4">
        {topTv.map((tv) => (
          <Link to={`/tv/${tv.id}`}>
            <div
              className="w-24 sm:w-32 lg:w-48 cursor-pointer rounded-lg m-1 lg:m-3 transition-all"
              key={tv.id}>
              <div className="flex justify-center items-center">
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/original/${tv.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={tv.title}
                  className="rounded-xl sm:w-full lg:w-full h-36 sm:h-48 lg:h-80 p-1 hover:p-0"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
