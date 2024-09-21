import React from "react";
import { Banner } from "./components/Banner";
import Navbar from "../components/NavBar";
import { BannerTeam } from "./components/BannerTeam";
import * as S from "./styles";
import Computer from "../assets/icons/computer.png";
import { Typography } from "@mui/material";
import { Benefits } from "./components/Benefits";


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
      <Typography variant="h3">Pronto para mudar o rumo do seu consultório?</Typography>
    </S.WrapperTextCenter>
    <Benefits />
  </div>
  )
};

export default Home;
