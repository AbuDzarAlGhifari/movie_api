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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?query=${searchQuery}`);
          }}
          className="relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search film..."
            className="cursor-pointer bg-white relative z-10 h-8 pl-4 pr-4 rounded-full border bg-transparent 
              outline-none border-transparent w-full focus:cursor-text focus:bg-slate-200"
          />
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
