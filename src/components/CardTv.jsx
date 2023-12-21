import React from "react";
import { Link } from "react-router-dom";

const Card = ({ tv, i }) => {
  return (
    <Link
      to={`/tv/${tv.id}`}
      className="cursor-pointer bg-black border rounded-lg m-3 text-white text-xs sm:text-sm lg:text-lg hover:text-black hover:bg-gray-400 p-0.5 hover:p-0 transition-all"
      key={i}>
      <div className="flex justify-center items-center">
        <img
          className="rounded-t-lg w-full h-32 sm:h-52 lg:h-72"
          src={`${import.meta.env.REACT_APP_BASEIMGURL}/${tv.poster_path}`}
        />
      </div>
      <div className="cursor-pointer text-center px-1 truncate">{tv.name}</div>
      <div className="cursor-pointer text-center">{tv.first_air_date}</div>
      <div className="cursor-pointer text-center">⭐{tv.vote_average}</div>
    </Link>
  );
};

export default Card;
