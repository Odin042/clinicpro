import React from "react";
import { Banner } from "./components/Banner";
import Navbar from "../components/NavBar";
import { BannerTeam } from "./components/BannerTeam";
import * as S from "./styles";
import Computer from "../assets/icons/computer.png";
import { Typography } from "@mui/material";
import { Benefits } from "./components/Benefits";
import BannerFuction from "./components/BannerFuction";
import { OfferCard } from "./components/OfferCard";
import Questions from "./components/Questions";


export const Home = () => {
  return (
  <div>
    <Navbar />
    <Banner />
    <BannerTeam />
    <S.WrapperTextCenter>
      <S.ImageCenter>
       <img src={Computer} alt="logo" />
      </S.ImageCenter>
      <Typography variant="h3">Já pensou o seu consultorio lucrando todos os dias ?</Typography>
    </S.WrapperTextCenter>
    <Benefits />
    <BannerFuction />
    <OfferCard />
    <Questions />
  </div>
  )
};

export default Home;
