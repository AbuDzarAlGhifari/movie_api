import React from "react";
import { Link } from "react-router-dom";

const Card = ({ movie, i }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="cursor-pointer rounded-lg m-2 text-xs sm:text-sm lg:text-lg p-0.5 hover:p-0 font-poppins text-yellow-300 hover:text-blue-500 transition-all"
      key={i}>
      <div className="absolute bg-black bg-opacity-50 text-yellow-300 text-[10px] sm:text-sm lg:text-lg rounded-lg pr-2">
        ⭐{movie.vote_average}
      </div>
      <div className="flex justify-center items-center">
        <img
          className="rounded-t-lg w-full h-32 sm:h-52 lg:h-72"
          src={`${import.meta.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
        />
      </div>
      <div className="cursor-pointer text-center px-1 text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 truncate">
        {movie.title}
      </div>
      <div className="cursor-pointer rounded-b-lg  text-center text-[10px] sm:text-sm lg:text-lg bg-black bg-opacity-50 ">
        {movie.release_date}
      </div>
    </Link>
  );
};

export default Card;
