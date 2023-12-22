import React from "react";
import axios from "axios";
import CardTv from "../../components/CardTv";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Tv = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;

  const navigate = useNavigate();
  const [popularTv, setPopularTv] = useState([]);
  const [topTv, setTopTv] = useState([]);

  const getPopularTv = async () => {
    const popular = await axios.get(
      `${baseURL}/tv/popular?page=1&api_key=${apiKey}`
    );
    const limitedPopularTv = popular.data.results.slice(0, 6);
    setPopularTv(limitedPopularTv);
    // console.log(limitedPopularTv);
  };

  const getTopTv = async () => {
    const popular = await axios.get(
      `${baseURL}/tv/top_rated?page=1&api_key=${apiKey}`
    );
    const limitedTopTv = popular.data.results.slice(0, 6);
    setTopTv(limitedTopTv);
    // console.log(limitedPopularTv);
  };

  useEffect(() => {
    getPopularTv();
    getTopTv();
  }, []);

  return (
    <div className="py-4 justify-center text-sm bg-gray-900 min-h-screen">
      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>POPULAR TV SERIES</h1>
        <h1
          className="cursor-pointer underline italic text-red-700 hover:text-blue-500"
          onClick={() => navigate("/pagetv/popular")}>
          Others...
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {popularTv.map((tv, i) => {
          return <CardTv key={i} tv={tv} />;
        })}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">
        <h1>TOP RAITING TV SERIES</h1>
        <h1
          className="cursor-pointer underline italic text-red-700 hover:text-blue-500"
          onClick={() => navigate("/pagetv/top")}>
          Others...
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {topTv.map((tv, i) => {
          return <CardTv key={i} tv={tv} />;
        })}
      </div>
    </div>
  );
};

export default Tv;
