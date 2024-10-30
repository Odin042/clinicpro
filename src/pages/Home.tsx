import React, { useRef } from "react";
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
import { Footer } from "../components/Footer";

export const Home = () => {

  const bannerRef = useRef(null);
  const bannerTeamRef = useRef(null);
  const benefitsRef = useRef(null);
  const bannerFuctionRef = useRef(null);
  const offerCardRef = useRef(null);
  const questionsRef = useRef(null);

  return (
  <div>
    <Navbar />
    <Banner />
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
