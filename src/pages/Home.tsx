import React from "react";
import { Banner } from "../components/Banner/Banner";
import Navbar from "../components/NavBar/Navbar";
import { BannerTeam } from "../components/BannerTeam/BannerTeam";
import * as S from "./styles";
import Computer from "../components/assets/icons/computer.png";
import { Typography } from "@mui/material";


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
  </div>
  )
};

export default Home;
