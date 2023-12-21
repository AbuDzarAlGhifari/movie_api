import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailMovie = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;
  const { movieId } = useParams();

  const [detailMovies, setDetailMovies] = useState([]);
  const [clipsMovie, setClipsMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const getMovieList = async (movieId) => {
    try {
      const movie = await axios.get(
        `${baseURL}/movie/${movieId}?api_key=${apiKey}`
      );
      setDetailMovies(movie.data);
      // console.log(movie.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const getClips = async (movieId) => {
    try {
      const movie = await axios.get(
        `${baseURL}/movie/${movieId}/videos?api_key=${apiKey}`
      );
      const limitedCast = movie.data.results.slice(0, 15);
      setClipsMovie(limitedCast);
      // console.log(limitedCast);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const getCast = async (movieId) => {
    try {
      const response = await axios.get(
        `${baseURL}/movie/${movieId}/credits?api_key=${apiKey}`
      );
      const limitedCast = response.data.cast.slice(0, 12);
      setCast(limitedCast);
      // console.log(limitedCast);
    } catch (error) {
      console.error("Error fetching cast details:", error);
    }
  };

  const getRecommendedMovies = async (movieId) => {
    try {
      const response = await axios.get(
        `${baseURL}/movie/${movieId}/recommendations?api_key=${apiKey}`
      );
      const limitedRecommendedMovies = response.data.results.slice(0, 15);
      setRecommendedMovies(limitedRecommendedMovies);
      // console.log(limitedRecommendedMovies);
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
  };

  const convertToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatRating = (rating) => {
    return rating * 10;
  };

  const style = {
    whiteSpace: "pre-line",
  };

  useEffect(() => {
    getMovieList(movieId);
    getClips(movieId);
    getCast(movieId);
    getRecommendedMovies(movieId);
  }, [movieId]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <img
        src={`https://image.tmdb.org/t/p/original/${detailMovies.backdrop_path}`}
        alt="backdrop"
        className="w-full max-h-40 sm:max-h-[200px] md:max-h-[265px] lg:max-h-[450px] object-cover object-top opacity-25 absolute"
      />
      <div className="sm:flex md:flex lg:flex pt-2">
        <img
          src={`https://image.tmdb.org/t/p/original/${detailMovies.poster_path}`}
          alt="poster"
          className="rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 sm:mt-3 md:mt-5 lg:mt-7 w-24 sm:w-32 md:w-36 lg:w-64 sm:h-full md:h-full lg:h-full z-10 relative"
        />

        <div className="z-10 ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 sm:mt-6 md:mt-9 lg:mt-12 text-white text-xs sm:text-sm lg:text-lg">
          <h1 className="font-bold sm:font-extrabold md:font-extrabold lg:font-extrabold font-poppins text-center sm:text-left lg:text-left text-sm sm:text-lg lg:text-3xl">
            {detailMovies.title}
          </h1>
          <ul className="flex font-poppins text-[9px] sm:text-sm lg:text-lg  text-gray-300 space-x-1 lg:space-x-2 justify-center sm:justify-normal lg:justify-normal">
            <li className="">{`# ${detailMovies.release_date}`}</li>
            <li className="">
              <span># </span>
              {detailMovies.genres &&
                detailMovies.genres.map((genre) => (
                  <span key={genre.id} className="">
                    {genre.name},
                  </span>
                ))}
            </li>
            <li className="">
              <span># </span>
              {detailMovies.runtime && (
                <span className="">{`${convertToHoursAndMinutes(
                  detailMovies.runtime
                )}`}</span>
              )}
            </li>
            <li className="">
              <span># </span>
              {detailMovies.vote_average && (
                <span className="">{`⭐${formatRating(
                  detailMovies.vote_average
                )}/10`}</span>
              )}
            </li>
          </ul>
          <h1 className="mt-2  font-poppins italic text-center sm:text-left lg:text-left">
            {detailMovies.tagline}
          </h1>
          <div className="mt-2 mx-3 sm:mx-0 lg:mx-0 font-bold font-poppins text-sm">
            OverView
          </div>

          <h3
            style={style}
            className="mx-3 sm:mx-0 lg:mx-0 text-justify sm:mr-14 md:mr-16 lg:mr-20">
            {showMore
              ? `${detailMovies.overview}`
              : `${detailMovies.overview}`?.substring(0, 160) + "..."}
            <button
              className="font-semibold underline text-yellow-300 hover:text-blue-400"
              onClick={() => {
                setShowMore(!showMore);
              }}>
              {showMore ? "Show Less" : "Read More"}
            </button>
          </h3>
        </div>
      </div>

      <h1 className="text-white font-semibold font-poppins text-sm sm:text-lg lg:text-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-10 lg:mt-16">
        Clips And Trailers
      </h1>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-4 lg:mx-8 mt-1 lg:mt-3">
        {clipsMovie.map((clipsMovie) => (
          <div
            className="mr-5"
            onClick={() => {
              window.open(`https://youtube.com/watch?v=${clipsMovie.key}`);
            }}>
            <div className="relative flex-shrink-0 h-[110px] sm:h-[150px] md:h-[180px] lg:h-[250px] aspect-video rounded-xl">
              <img
                src={`https://img.youtube.com/vi/${clipsMovie.key}/hqdefault.jpg`}
                className="absolute object-cover h-[110px] sm:h-[150px] md:h-[180px] lg:h-[250px] aspect-video rounded-xl "
                alt="youtube thumbnail"
              />
            </div>
            <p className="text-[10px] sm:text-sm lg:text-xl text-center font-poppins text-white mt-1">
              {clipsMovie.name}
            </p>
          </div>
        ))}
      </div>

      <h1 className="text-white font-semibold font-poppins text-sm sm:text-lg lg:text-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-8 lg:mt-16">
        Top Cast
      </h1>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
        {cast.map((actor) => (
          <div className="m-3" key={actor.id}>
            <div className="flex items-center justify-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                    : "https://via.placeholder.com/150"
                }
                alt={actor.name}
                className="
                rounded-xl
                w-full
                h-auto
                flex
                items-center
                justify-center
                z-10"
              />
            </div>
            <p className="text-[10px] sm:text-sm lg:text-xl text-center font-poppins text-white mt-1">
              {actor.name}
            </p>
          </div>
        ))}
      </div>

      <h1 className="text-white font-semibold font-poppins text-sm sm:text-lg lg:text-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-10 lg:mt-16">
        Recommended Movies
      </h1>
      <div className="flex overflow-scroll scrollbar-hide snap-x pb-10 lg:mt-3 mx-2 sm:mx-3 md:mx-4 lg:mx-5">
        {recommendedMovies.map((movie) => (
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
                  className="rounded-xl sm:w-full lg:w-full h-36 sm:h-48 lg:h-72 p-1 hover:p-0"
                />
              </div>
            </div>
          </Link>
        ))}
        ,
      </div>
    </div>
  );
};

export default DetailMovie;
