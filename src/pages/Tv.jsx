import React from "react";
import axios from "axios";
import CardTv from "../components/CardTv";
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
    <div className="py-4 justify-center text-sm bg-gray-800 min-h-screen">
      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins text-xs sm:text-sm lg:text-lg">
        <h1>Popular Tv Series</h1>
        <h1
          className="cursor-pointer underline text-yellow-300 hover:text-blue-400"
          onClick={() => navigate("/pagetv/popular")}>
          Lainnya..
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {popularTv.map((tv, i) => {
          return <CardTv key={i} tv={tv} />;
        })}
      </div>

      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white font-poppins text-xs sm:text-sm lg:text-lg">
        <h1>Top Tv Series</h1>
        <h1
          className="cursor-pointer underline text-yellow-300 hover:text-blue-400"
          onClick={() => navigate("/pagetv/top")}>
          Lainnya..
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
