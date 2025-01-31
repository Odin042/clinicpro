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
      <Navbar
        sections={{
          homeRef: bannerRef,
          aboutRef: bannerTeamRef,
          profissionaisRef: benefitsRef,
          bannerFuctionRef: bannerFuctionRef,
          valoresRef: offerCardRef,
          faqRef: questionsRef,
        }}
      />

      <div ref={bannerRef}>
        <Banner />
      </div>

      <S.WrapperTextCenter>
        <S.ImageCenter>
          <img src={Computer} alt="logo" />
        </S.ImageCenter>
        <Typography variant="h3">Já pensou o seu consultório lucrando todos os dias?</Typography>
      </S.WrapperTextCenter>

      <div ref={benefitsRef}>
        <Benefits />
      </div>

      <div ref={bannerFuctionRef}>
        <BannerFuction />
      </div>

      <div ref={offerCardRef}>
        <OfferCard />
      </div>

      <div ref={questionsRef}>
        <Questions />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;