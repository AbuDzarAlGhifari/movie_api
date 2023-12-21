import React from "react";
import { Link } from "react-router-dom";

const Card = ({ movie, i }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="cursor-pointer bg-black border rounded-lg m-3 text-white text-xs sm:text-sm lg:text-lg hover:text-black hover:bg-gray-400 p-0.5 hover:p-0 transition-all"
      key={i}>
      <div className="flex justify-center items-center">
        <img
          className="rounded-t-lg w-full h-32 sm:h-52 lg:h-72"
          src={`${import.meta.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
        />
      </div>
      <div className="cursor-pointer text-center px-1 truncate">
        {movie.title}
      </div>
      <div className="cursor-pointer text-center">{movie.release_date}</div>
      <div className="cursor-pointer text-center">⭐{movie.vote_average}</div>
    </Link>
  );
};

export default Card;
