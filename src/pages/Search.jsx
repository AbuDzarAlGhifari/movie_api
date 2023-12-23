import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../components/api";
import Card from "../components/Card";

const Search = () => {
  const location = useLocation();
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
      <h1 className=" mx-2 sm:mx-4   pt-4 px-4 justify-between text-white font-poppins font-bold text-xs sm:text-sm lg:text-lg">Search Results for: {searchQuery}</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 mx-2 sm:mx-4">
        {searchResults.map((movie, i) => {
          return <Card key={i} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default Search;
