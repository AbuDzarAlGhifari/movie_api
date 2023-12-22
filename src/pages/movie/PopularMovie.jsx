import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

const PopularMovie = () => {
  const apiKey = import.meta.env.REACT_APP_APIKEY;
  const baseURL = import.meta.env.REACT_APP_BASEURL;

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
      <div className="flex mx-2 sm:mx-4 mt-1 sm:mt-2 lg:mt-3  pt-4 px-4 justify-between text-white">
        <h1 className="text-white font-poppins font-extrabold lg:text-2xl ">
          POPULAR MOVIE
        </h1>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {popularMovies.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>

      <div className="flex justify-center text-xs sm:text-lg lg:text-xl mt-4">
        <p className="mr-4 text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-gray-700 text-white hover:bg-gray-400 hover:text-gray-900 rounded-md">
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="ml-2 px-3 py-1 bg-gray-700 text-white hover:bg-gray-400 hover:text-gray-900 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularMovie;
