import React, { useState } from "react";
import logo from "../assets/logo_abmovie.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-black">
      <div className="flex container mx-auto px-4 py-2 justify-between items-center lg:px-10">
        {/* ICON */}
        <div className="flex cursor-pointer items-center justify-center order-1 sm:order-2 lg:order-1">
          <h1
            className="font-bold text-center italic text-lg sm:text-xl lg:text-2xl text-white"
            onClick={() => navigate("/")}>
            <span className="text-red-700 font-poppins">AB</span>movie
          </h1>
          {/* <img className="cursor-pointer flex justify-center items-center h-7 w-7" src={logo} /> */}
          <div className=" hidden sm:block">
            <ul className="flex justify-center items-center gap-1 pl-6 text-white ">
              <li
                className="cursor-pointer rounded-md hover:text-black hover:bg-white px-2 hover:font-bold"
                onClick={() => navigate("/pagemovie")}>
                Movie
              </li>
              <li
                className="cursor-pointer rounded-md hover:text-black hover:bg-white px-2 hover:font-bold"
                onClick={() => navigate("/pagetv")}>
                TV
              </li>
            </ul>
          </div>
        </div>
        {/* MENU */}
        <div className="flex justify-center items-center order-2 md:hidden lg:hidden">
          <input
            type="checkbox"
            className="hamburger"
            onClick={() => setToggleNavbar(toggleNavbar ? false : true)}
          />
        </div>

        {/* SEARCH */}
        <div className="hidden sm:block order-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?query=${searchQuery}`);
            }}
            className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movie..."
              className="cursor-pointer my-1 bg-white relative z-10 h-7 pl-3 pr-3 rounded-lg border bg-transparent 
              outline-none border-transparent w-full focus:cursor-text focus:bg-slate-200"
            />
          </form>
        </div>
      </div>
      {/* DROP MENU */}
      <div className={`${toggleNavbar ? "block" : "hidden"} lg:hidden`}>
        <ul className="flex flex-col gap-1 font-poppins text-white text-xs sm:text-lg bg ">
          {/* <li
            className="cursor-pointer px-4 hover:text-blue-500"
            onClick={() => navigate("/")}>
            Home
          </li> */}
          <li
            className="cursor-pointer px-4 hover:text-blue-500"
            onClick={() => navigate("/pagemovie")}>
            Movie
          </li>
          <li
            className="cursor-pointer px-4 hover:text-blue-500"
            onClick={() => navigate("/pagetv")}>
            TV
          </li>
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?query=${searchQuery}`);
          }}
          className="mx-4 pb-2 pt-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie..."
            className="cursor-pointer bg-white relative z-10 h-6 pl-2 pr-2 rounded-md border bg-transparent 
              outline-none border-transparent w-full focus:cursor-text focus:bg-slate-200"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
