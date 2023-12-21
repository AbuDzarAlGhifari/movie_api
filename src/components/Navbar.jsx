import React, { useState } from "react";
import logo from "../assets/logo_abmovie.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-black">
      <div className="flex container mx-auto px-4 py-2 justify-between items-center lg:px-10">
        {/* ICON */}
        <div className="order-1 sm:order-2 lg:order-1">
          <h1 className="font-bold text-center text-sm text-white">AbMovie</h1>
          {/* <img className="cursor-pointer flex justify-center items-center h-7 w-7" src={logo} /> */}
        </div>
        {/* MENU */}
        <div className="flex justify-center items-center order-2 sm:hidden lg:hidden">
          <input
            type="checkbox"
            className="hamburger"
            onClick={() => setToggleNavbar(toggleNavbar ? false : true)}
          />
        </div>

        <div className="hidden sm:block sm:order-2 lg:block lg:order-2">
          <ul className="flex items-center gap-1  text-white">
            <li
              className="cursor-pointer rounded-md hover:text-black hover:bg-white px-4 hover:font-bold"
              onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="cursor-pointer rounded-md hover:text-black hover:bg-white px-4 hover:font-bold"
              onClick={() => navigate("/pagemovie")}>
              Movie
            </li>
            <li
              className="cursor-pointer rounded-md hover:text-black hover:bg-white px-4 hover:font-bold"
              onClick={() => navigate("/pagetv")}>
              TV
            </li>
          </ul>
        </div>
        {/* SEARCH */}
        <div className="hidden sm:block order-3">
          <form action="" className="relative">
            <input
              className="cursor-pointer relative z-10 h-8 w-8 rounded-full border bg-transparent 
            outline-none border-transparent focus:w-full focus:cursor-text focus:pl-4 focus:pr-4 focus:bg-slate-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-12 w-12 border-r border-transparent 
            stroke-white px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>
      </div>
      {/* DROP MENU */}
      <div className={`${toggleNavbar ? "block" : "hidden"} lg:hidden`}>
        <ul className="flex flex-col gap-1 font-kenia justify-center items-center text-white text-sm sm:text-lg bg-black">
          <li
            className="cursor-pointer justify-center items-center px-4"
            onClick={() => navigate("/")}>
            Home
          </li>
          <li
            className="cursor-pointer justify-center items-center px-4"
            onClick={() => navigate("/pagemovie")}>
            Movie
          </li>
          <li
            className="cursor-pointer justify-center items-center px-4"
            onClick={() => navigate("/pagetv")}>
            TV
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
