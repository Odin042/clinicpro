import React from "react";
import { Banner } from "../components/Banner/Banner";
import Navbar from "../components/NavBar/Navbar";
import { BannerTeam } from "../components/BannerTeam/BannerTeam";


export const Home = () => {
  return (
  <div>
    <Navbar />
    <Banner />
    <BannerTeam />
  </div>
  )
};

export default Home;
