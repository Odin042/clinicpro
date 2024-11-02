import React from "react";
import * as S from "./styles";
import { Button, TextField, Typography } from "@mui/material";
import { Speciality } from "./Speciality";

export const RegisterForm = () => {
  return (
    <S.Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Cadastro
      </Typography>
      <S.FormRegister>
        <S.InputsRow>
          <S.InputsRegister>
            <Speciality />
          </S.InputsRegister>
          <S.InputsRegister>
            <Typography variant="h6">Nome</Typography>
            <TextField
              variant="outlined"
              placeholder="Digite seu nome"
              sx={{ width: { xs: "100%", md: "600px" } }}
            />
          </S.InputsRegister>
        </S.InputsRow>
        <S.InputsRegister>
          <Typography variant="h6">Email</Typography>
          <TextField
            variant="outlined"
            placeholder="Digite seu email"
            sx={{ width: { xs: "100%", md: "600px" } }}
            type="email"
          />
        </S.InputsRegister>
        <S.InputsRow>
          <S.InputsRegister>
            <Typography variant="h6">Senha</Typography>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Digite sua senha"
              sx={{ width: { xs: "100%", md: "600px" } }}
            />
          </S.InputsRegister>
          <S.InputsRegister>
            <Typography variant="h6">Confirmar Senha</Typography>
            <TextField
              type="password"
              variant="outlined"
              placeholder="Confirme sua senha"
              sx={{ width: { xs: "100%", md: "600px" } }}
            />
          </S.InputsRegister>
        </S.InputsRow>
        <Button variant="contained" sx={{ width: { xs: "100%", md: "200px" } }}>
          Salvar
        </Button>
      </S.FormRegister>
    </S.Container>
  );
};
