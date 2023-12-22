import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailTv = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;
  const { tvId } = useParams();

  const [detailTv, setDetailTv] = useState([]);
  const [clipsTv, setClipsTv] = useState([]);
  const [cast, setCast] = useState([]);
  const [recommendedTv, setRecommendedTv] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const getTvList = async (tvId) => {
    try {
      const tv = await axios.get(`${baseURL}/tv/${tvId}?api_key=${apiKey}`);
      setDetailTv(tv.data);
      //   console.log(tv.data);
    } catch (error) {
      console.error("Error fetching tv details:", error);
    }
  };

  const getClips = async (tvId) => {
    try {
      const tv = await axios.get(
        `${baseURL}/tv/${tvId}/videos?api_key=${apiKey}`
      );
      const limitedCast = tv.data.results.slice(0, 15);
      setClipsTv(limitedCast);
      console.log(limitedCast);
    } catch (error) {
      console.error("Error fetching tv details:", error);
    }
  };

  const getCast = async (tvId) => {
    try {
      const response = await axios.get(
        `${baseURL}/tv/${tvId}/credits?api_key=${apiKey}`
      );
      const limitedCast = response.data.cast.slice(0, 12);
      setCast(limitedCast);
      // console.log(limitedCast);
    } catch (error) {
      console.error("Error fetching cast details:", error);
    }
  };

  const getRecommendedTv = async (tvId) => {
    try {
      const response = await axios.get(
        `${baseURL}/tv/${tvId}/recommendations?api_key=${apiKey}`
      );
      const limitedRecommendedTv = response.data.results.slice(0, 15);
      setRecommendedTv(limitedRecommendedTv);
      // console.log(limitedRecommendedMovies);
    } catch (error) {
      console.error("Error fetching recommended Tv:", error);
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
    getTvList(tvId);
    getClips(tvId);
    getCast(tvId);
    getRecommendedTv(tvId);
  }, [tvId]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <img
        src={`https://image.tmdb.org/t/p/original/${detailTv.backdrop_path}`}
        alt="backdrop"
        className="w-full max-h-40 sm:max-h-[200px] md:max-h-[265px] lg:max-h-[450px] object-cover object-top opacity-25 absolute"
      />
      <div className="sm:flex md:flex lg:flex pt-2">
        <img
          src={`https://image.tmdb.org/t/p/original/${detailTv.poster_path}`}
          alt="poster"
          className="rounded-xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 sm:mt-3 md:mt-5 lg:mt-7 w-24 sm:w-32 md:w-36 lg:w-64 sm:h-full md:h-full lg:h-full z-10 relative"
        />

        <div className="z-10 ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 sm:mt-6 md:mt-9 lg:mt-12 text-white text-xs sm:text-sm lg:text-lg">
          <h1 className="font-bold sm:font-extrabold md:font-extrabold lg:font-extrabold font-poppins text-center sm:text-left lg:text-left text-sm sm:text-lg lg:text-3xl">
            {detailTv.name}
          </h1>
          <ul className="flex font-poppins text-[9px] sm:text-sm lg:text-lg  text-gray-300 space-x-1 lg:space-x-2 justify-center sm:justify-normal lg:justify-normal">
            <li className="">{`# ${detailTv.first_air_date}`}</li>
            <li className="">
              <span># </span>
              {detailTv.genres &&
                detailTv.genres.map((genre) => (
                  <span key={genre.id} className="">
                    {genre.name},
                  </span>
                ))}
            </li>
            <li className="">
              <span># </span>
              {detailTv.vote_average && (
                <span className="text-red-700"> ★ { `${formatRating(
                  detailTv.vote_average
                )}/10`}</span>
              )}
            </li>
          </ul>
          <h1 className="mt-2  font-poppins italic text-center sm:text-left lg:text-left">
            {detailTv.tagline}
          </h1>
          <div className="mt-2 mx-3 sm:mx-0 lg:mx-0 font-bold font-poppins text-sm">
            OverView
          </div>

          <h3
            style={style}
            className="mx-3 sm:mx-0 lg:mx-0 text-justify sm:mr-14 md:mr-16 lg:mr-20">
            {showMore
              ? `${detailTv.overview}`
              : `${detailTv.overview}`?.substring(0, 160) + "..."}
            <button
              className="font-semibold underline text-red-700 hover:text-blue-500"
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
        {clipsTv.map((clipsTv) => (
          <div
            className="mr-5"
            onClick={() => {
              window.open(`https://youtube.com/watch?v=${clipsTv.key}`);
            }}>
            <div className="relative flex-shrink-0 h-[110px] sm:h-[150px] md:h-[180px] lg:h-[250px] aspect-video rounded-xl">
              <img
                src={`https://img.youtube.com/vi/${clipsTv.key}/hqdefault.jpg`}
                className="absolute object-cover h-[110px] sm:h-[150px] md:h-[180px] lg:h-[250px] aspect-video rounded-xl "
                alt="youtube thumbnail"
              />
            </div>
            <p className="text-[10px] sm:text-sm lg:text-xl text-center font-poppins text-red-700 mt-1">
              {clipsTv.name}
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
            <p className="text-[10px] sm:text-sm lg:text-xl text-center font-poppins text-red-700 mt-1">
              {actor.name}
            </p>
          </div>
        ))}
      </div>

      <h1 className="text-white font-semibold font-poppins text-sm sm:text-lg lg:text-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-10 lg:mt-16">
        Recommended Tv Series
      </h1>
      <div className="flex overflow-scroll scrollbar-hide snap-x mx-2 sm:mx-3 md:mx-4 lg:mx-5">
        {recommendedTv.map((tv) => (
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
        ,
      </div>
    </div>
  );
};

export default DetailTv;
