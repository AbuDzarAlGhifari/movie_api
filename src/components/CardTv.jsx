import React from "react";
import { Link } from "react-router-dom";

const Card = ({ tv, i }) => {
  return (
    <Link
      to={`/tv/${tv.id}`}
      className="cursor-pointer rounded-lg m-2 text-xs sm:text-sm lg:text-lg p-0.5 hover:p-0 font-poppins text-red-700 hover:text-blue-500 transition-all"
      key={i}>
      <div className="absolute bg-black bg-opacity-50 text-red-700 text-[10px] sm:text-sm lg:text-lg rounded-lg pr-2">
        <span className="text-red-700 pl-1"> ★</span> {tv.vote_average}
      </div>
      <div className="flex justify-center items-center">
        <img
          className="rounded-t-lg w-full h-32 sm:h-52 lg:h-72"
          src={`${import.meta.env.REACT_APP_BASEIMGURL}/${tv.poster_path}`}
        />
      </div>
      <div className="cursor-pointer text-center px-1 text-[10.5px] sm:text-sm lg:text-lg bg-black bg-opacity-50 truncate">
        {tv.name}
      </div>
      <div className="cursor-pointer rounded-b-lg  text-center text-[9.5px] sm:text-[13px] lg:text-[17px] bg-black bg-opacity-50 ">
        {tv.first_air_date}
      </div>
    </Link>
  );
};

export default Card;
