import React from "react";
import * as S from "./styles";
import { Avatar, Typography } from "@mui/material";
import Joao from "../assets/joao.jpeg";
import Guilherme from "../assets/guilherme.jpeg";

export const BannerTeam = () => {
  return (
    <S.Container>
      <S.Title>
        <Typography variant="h4" component="div">
          Nosso Time
        </Typography>
      </S.Title>
      <S.StackWrapper>
        <S.AvatarWrapper>
          <Avatar
            alt="Joao Cavalcante"
            src={Joao}
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="body2" color="#252525" align="center">
            João Carlos Cavalcante<br/> Nutricionista
          </Typography>
        </S.AvatarWrapper>
        <S.AvatarWrapper>
          <Avatar
            alt="Guilherme Fernandes"
            src={Guilherme}
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="body2" color="#252525" align="center">
            Guilherme Fernandes<br/> Programador
          </Typography>
        </S.AvatarWrapper>
      </S.StackWrapper>
    </S.Container>
  );
};
