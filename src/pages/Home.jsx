import React from "react";
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
    console.log(limitedPopularMovie);
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

  const formatRating = (rating) => {
    return rating * 10;
  };

  const style = {
    whiteSpace: "pre-line",
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
    <div className="justify-center pb-5 text-sm bg-gray-900 min-h-screen">
      <div className="scroll-container scrollbar-hide" ref={scrollContainerRef}>
        {popularMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="scroll-item w-full max-h-40 sm:max-h-[200px] md:max-h-[265px] lg:max-h-[450px] object-cover object-top relative flex-shrink-0 scroll-snap-align-start">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="backdrop"
              className="w-full h-full object-cover object-top opacity-30"
            />
            <div className="icon-container z-20">
              <div className="icon" onClick={scrollToPreviousPoster}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div className="icon" onClick={scrollToNextPoster}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
            <div className="poster-container absolute inset-0 flex lg:flex py-2 pl-4 sm:pl-8 lg:pl-16">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="poster"
                className="rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 sm:my-3 my:mt-5 lg:my-10 w-24 sm:w-32 md:w-36 lg:w-56 z-10"
              />
              <div className="z-20 mr-8 ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 sm:mt-6 md:mt-9 lg:mt-12 text-white text-xs sm:text-sm lg:text-lg truncate">
                <h1 className="font-bold sm:font-extrabold md:font-extrabold lg:font-extrabold font-poppins text-left text-sm sm:text-lg lg:text-3xl">
                  {movie.title}
                </h1>
                <ul className="flex font-poppins text-[9px] sm:text-sm lg:text-lg  text-gray-300 space-x-1 lg:space-x-2">
                  <li className="">{`# ${movie.release_date}`}</li>
                  <li className="">
                    <span># </span>
                    {movie.vote_average && (
                      <span className="">{`⭐${formatRating(
                        movie.vote_average
                      )}/10`}</span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>POPULAR TV SERIES</h1>
        <h1
          className="cursor-pointer underline italic text-red-700 hover:text-blue-500"
          onClick={() => navigate("/pagetv/popular")}>
          Others...
        </h1>
      </div>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5 lg:mb-4">
        {popularTv.map((tv) => (
          <Link to={`/tv/${tv.id}`}>
            <div
              className="w-24 sm:w-32 lg:w-48 cursor-pointer rounded-lg m-1 lg:m-3  text-xs sm:text-sm lg:text-lg p-0.5 hover:p-0 font-poppins text-red-700 hover:text-blue-500"
              key={tv.id}>
              <div className="flex relative">
                <div className="absolute bg-black bg-opacity-50 text-red-700 text-[10px] sm:text-sm lg:text-lg rounded-lg pr-2">
                  <span className="text-red-700 pl-1"> ★</span>{" "}
                  {tv.vote_average}
                </div>
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/original/${tv.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={tv.title}
                  className="rounded-t-lg sm:w-full lg:w-full h-36 sm:h-48 lg:h-80"
                />
              </div>
              <div className="cursor-pointer text-center px-1 text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 truncate">
                {tv.name}
              </div>
              <div className="cursor-pointer rounded-b-lg  text-center text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 ">
                {tv.first_air_date}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>TOP RAITING MOVIE</h1>
        <h1
          className="cursor-pointer underline italic text-yellow-300 hover:text-blue-500"
          onClick={() => navigate("/pagemovie/top")}>
          Others...
        </h1>
      </div>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5 lg:mb-4">
        {topMovie.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div
              className="w-24 sm:w-32 lg:w-48 cursor-pointer rounded-lg m-1 lg:m-3  text-xs sm:text-sm lg:text-lg p-0.5 hover:p-0 font-poppins text-yellow-300 hover:text-blue-500"
              key={movie.id}>
              <div className="flex relative">
                <div className="absolute bg-black bg-opacity-50 text-yellow-300 text-[10px] sm:text-sm lg:text-lg rounded-lg pr-2">
                  ⭐{movie.vote_average}
                </div>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.title}
                  className="rounded-t-lg sm:w-full lg:w-full h-36 sm:h-48 lg:h-80"
                />
              </div>
              <div className="cursor-pointer text-center px-1 text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 truncate">
                {movie.title}
              </div>
              <div className="cursor-pointer rounded-b-lg  text-center text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 ">
                {movie.release_date}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>TOP RAITING TV SERIES</h1>
        <h1
          className="cursor-pointer underline italic text-red-700 hover:text-blue-500"
          onClick={() => navigate("/pagetv/top")}>
          Others...
        </h1>
      </div>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5 lg:mb-4">
        {topTv.map((tv) => (
          <Link to={`/tv/${tv.id}`}>
            <div
              className="w-24 sm:w-32 lg:w-48 cursor-pointer rounded-lg m-1 lg:m-3  text-xs sm:text-sm lg:text-lg p-0.5 hover:p-0 font-poppins text-red-700 hover:text-blue-500"
              key={tv.id}>
              <div className="flex relative">
                <div className="absolute bg-black bg-opacity-50 text-red-700 text-[10px] sm:text-sm lg:text-lg rounded-lg pr-2">
                  <span className="text-red-700 pl-1"> ★</span>{" "}
                  {tv.vote_average}
                </div>
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/original/${tv.poster_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={tv.title}
                  className="rounded-t-lg sm:w-full lg:w-full h-36 sm:h-48 lg:h-80"
                />
              </div>
              <div className="cursor-pointer text-center px-1 text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 truncate">
                {tv.name}
              </div>
              <div className="cursor-pointer rounded-b-lg  text-center text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 ">
                {tv.first_air_date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
