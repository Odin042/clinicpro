import React from "react";
import * as S from "./styles";
import { Button, Typography } from "@mui/material";
import BannerImg from "../assets/banner.jpg";

export const Banner = () => {
  return (
    <S.Container>
      <S.Title>
        <Typography variant="h3">
          Seja Bem-Vindo ao Clinic<strong>PRO</strong>{" "}
        </Typography>
        <Typography variant="h6" sx={{ alignItems: "flex-start" }}>
          A maior plataforma de gestão de consultórios do Brasil
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "10px",
            display: { xs: "none", sm: "block" },
          }}
        >
          Cadastre-se
        </Button>
      </S.Title>
      <S.ImageBanner>
        <img src={BannerImg} alt="Banner" />
      </S.ImageBanner>
    </S.Container>
  );
};
