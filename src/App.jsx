import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLama from "./pages/HomeLama";
import DetailMovie from "./pages/DetailMovie";
import PageNotFound from "./pages/PageNotFound";
import Movie from "./pages/Movie";
import PopularMovie from "./pages/PopularMovie";
import TopRaitingMovie from "./pages/TopRaitingMovie";
import UpComingMovie from "./pages/UpComingMovie";
import Tv from "./pages/Tv";
import PopularTv from "./pages/PopularTv";
import TopRaitingTv from "./pages/TopRaitingTv";
import DetailTv from "./pages/DetailTv";
import Footer from "./components/Footer";

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
        <Route path="/tes" element={<HomeLama />} />
        <Route path="/movie/:movieId" element={<DetailMovie />} />
        <Route path="/tv/:tvId" element={<DetailTv />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
