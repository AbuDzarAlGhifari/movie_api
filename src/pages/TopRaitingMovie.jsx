import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const TopRaitingMovie = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;

  const [topMovie, setTopMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getMovieList = async (page) => {
    try {
      const movie = await axios.get(
        `${baseURL}/movie/top_rated?page=${page}&api_key=${apiKey}`
      );
      const limitedTopMovie = movie.data.results.slice(0, 12);
      setTopMovie(limitedTopMovie);
    } catch (error) {
      console.error("Error fetching top movies:", error);
    }
  };

  useEffect(() => {
    getMovieList(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="py-4 justify-center text-sm bg-gray-800 min-h-screen">
      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white">
        <h1 className="text-white font-poppins font-extrabold lg:text-2xl ">
          Top Raiting Movie
        </h1>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {topMovie.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-gray-600 text-white hover:bg-white hover:text-gray-600 rounded-md">
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="ml-2 px-3 py-1 bg-gray-600 text-white hover:bg-white hover:text-gray-600 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default TopRaitingMovie;
