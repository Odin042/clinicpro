import { useState } from "react";
import * as S from "./styles";
import { Login } from "../Login/LoginForm";
import BannerRegister from "../../assets/bannerregister.jpg";
import { RegisterForm } from "./components/RegisterForm";
import { Typography } from "@mui/material";
import Logo from "../../assets/clinicpro.png";
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate()

  const handleRegister = () => {
    setIsRegister(!isRegister);
  };

 

  return (
    <S.WrapperLogin>
      <S.ImageLogin>
        <img src={BannerRegister} alt="Imagem de registro" />
      </S.ImageLogin>
      <S.LoginForm>
        <S.LogoWrapper>
          <img src={Logo} alt="Logo" />
          <Typography variant="body2" color="#49504E">
            Faça seu cadastro
          </Typography>
        </S.LogoWrapper>
          <RegisterForm />
      </S.LoginForm>
    </S.WrapperLogin>
  );
};
