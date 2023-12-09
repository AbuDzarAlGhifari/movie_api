import React, { useState } from "react";
import hamburger from "../assets/icons8-menu-bar.svg";
import hamburger_active from "../assets/icons8-close.svg";

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-400 to-red-700">
      <div className="flex container mx-auto px-4 py-2 justify-between items-center lg:px-10">
        {/* ICON */}
        <div className="order-1 sm:order-2 lg:order-1">
          <img className="cursor-pointer" src="/src/assets/.svg" />
        </div>
        {/* MENU */}
        <div
          className="order-2 sm:order-1 lg:hidden"
          onClick={() => setToggleNavbar(toggleNavbar ? false : true)}>
          <img
            className="h-10 w-10 cursor-pointer"
            src={toggleNavbar ? hamburger_active : hamburger}
            alt="hamburger"
          />
        </div>

        <div className="hidden lg:block lg:order-2">
          <ul className="flex items-center gap-1 bg-red-700 border-2 border-gray-400 rounded-full text-white">
            <li className="cursor-pointer rounded-full hover:text-red-700 hover:bg-gray-400 px-4 hover:font-bold">
              Home
            </li>
            <li className="cursor-pointer rounded-full hover:text-red-700 hover:bg-gray-400 px-4 hover:font-bold">
              Popular
            </li>
            <li className="cursor-pointer rounded-full hover:text-red-700 hover:bg-gray-400 px-4 hover:font-bold">
              Genre
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
            stroke-black px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
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
        <ul className="flex flex-col gap-1 font-kenia text-sm sm:text-lg bg-gradient-to-r from-red-700 to-gray-400">
          <li className="cursor-pointer border-red-700 border-y-2 bg-gray-400 hover:text-white hover:bg-red-700 hover:border-gray-400 px-4">
            Home
          </li>
          <li className="cursor-pointer border-red-700 border-y-2 bg-gray-400 hover:text-white hover:bg-red-700 hover:border-gray-400 px-4">
            Popular
          </li>
          <li className="cursor-pointer border-red-700 border-y-2 bg-gray-400 hover:text-white hover:bg-red-700 hover:border-gray-400 px-4">
            Genre
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
