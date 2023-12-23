import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailMovie from "./pages/movie/DetailMovie";
import PageNotFound from "./pages/PageNotFound";
import Movie from "./pages/movie/Movie";
import PopularMovie from "./pages/movie/PopularMovie";
import TopRaitingMovie from "./pages/movie/TopRaitingMovie";
import UpComingMovie from "./pages/movie/UpComingMovie";
import Tv from "./pages/tv/Tv";
import PopularTv from "./pages/tv/PopularTv";
import TopRaitingTv from "./pages/tv/TopRaitingTv";
import DetailTv from "./pages/tv/DetailTv";
import Footer from "./components/Footer";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagemovie" element={<Movie />} />
        <Route path="/pagemovie/popular" element={<PopularMovie />} />
        <Route path="/pagemovie/top" element={<TopRaitingMovie />} />
        <Route path="/pagemovie/up" element={<UpComingMovie />} />
        <Route path="/pagetv" element={<Tv />} />
        <Route path="/pagetv/popular" element={<PopularTv />} />
        <Route path="/pagetv/top" element={<TopRaitingTv />} />
        <Route path="/movie/:movieId" element={<DetailMovie />} />
        <Route path="/tv/:tvId" element={<DetailTv />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
