import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

const PopularMovie = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;
  const navigate = useNavigate();

  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getMovieList = async (page) => {
    try {
      const movie = await axios.get(
        `${baseURL}/movie/popular?page=${page}&api_key=${apiKey}`
      );
      const limitedPopularMovie = movie.data.results.slice(0, 12);
      setPopularMovies(limitedPopularMovie);
      setTotalPages(movie.data.total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    getMovieList(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    newPage = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <div className="py-4 justify-center text-sm bg-gray-900 min-h-screen">
      <div className="flex font-poppins font-bold mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-xs sm:text-sm lg:text-lg text-white">
        <h1 className="text-white font-poppins font-extrabold lg:text-2xl ">
          POPULAR MOVIE
        </h1>
        <h1
          className="cursor-pointer underline italic text-yellow-300 hover:text-blue-500"
          onClick={() => navigate(-1)}>
          Back
        </h1>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {popularMovies.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>

      <div className="flex justify-center items-center text-xs sm:text-lg lg:text-xl mt-4">
        <p className="mr-4 text-yellow-400">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-gray-950 text-yellow-400 hover:bg-gray-800 hover:text-blue-400 rounded-md">
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="ml-2 px-3 py-1 bg-gray-950 text-yellow-400 hover:bg-gray-800 hover:text-blue-400 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularMovie;
