import { useState } from "react";
import * as S from "./styles";
import { LoginForm } from "./components/LoginForm";
import BannerRegister from "../../assets/bannerregister.jpg";
import { RegisterForm } from "./components/RegisterForm";
import { Typography } from "@mui/material";
import Logo from "../../assets/clinic360logo.png";

export const Register = () => {
  const [isRegister, setIsRegister] = useState(false);

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
            {isRegister ?  "Faça seu cadastro" : "Faça seu login"}
          </Typography>
        </S.LogoWrapper>
        {isRegister ? (
          <RegisterForm />
        ) : (
          <LoginForm onToggleRegister={handleRegister} />
        )}
      </S.LoginForm>
    </S.WrapperLogin>
  );
};
