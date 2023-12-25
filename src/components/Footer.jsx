import React from "react";

const Footer = () => {
  return (
    <div className="bg-black py-1 text-center ">
      <p className="py-1 font-poppins italic font-semibold text-center text-white text-xs sm:text-sm">
        {`Created by `}
        <span className="text-yellow-300 hover:text-blue-600 ">
          <a href="https://abudzaralghifari.vercel.app/" target="_blank">
            Abu Dzar Al Ghifari (2023)
          </a>
        </span>
      </p>
      <p className="py-1 font-poppins italic font-semibold text-center text-white text-xs sm:text-sm">
        Powered by{" "}
        <span className="text-yellow-300 hover:text-blue-600">
          <a href="https://www.themoviedb.org/movie" target="_blank">
            The Movie Database (TMDB) API V3
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
