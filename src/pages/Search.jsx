import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../components/api";
import Card from "../components/Card";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery)
        .then((results) => setSearchResults(results))
        .catch((error) => console.error("Error:", error));
    }
  }, [searchQuery]);

  return (
    <div className="justify-center pb-5 text-sm bg-gray-900 min-h-screen">
      <div className="flex font-poppins font-bold mx-2 pt-4 px-4 justify-between text-xs sm:text-sm lg:text-lg text-white">
        <h1>
          Search Results for : {searchQuery}
        </h1>
        <h1
          className="cursor-pointer underline italic text-yellow-300 hover:text-blue-500"
          onClick={() => navigate(-1)}>
          Back
        </h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {searchResults.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default Search;
