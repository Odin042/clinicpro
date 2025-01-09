import { useState } from "react";
import * as S from "./styles";
import { Button, Divider, TextField, Typography } from "@mui/material";
import useLogin from "../../Register/hooks/useLoginUser";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/clinic360logo.png";
import BannerRegister from "../../../assets/bannerregister.jpg";

export const Login = ({ onToggleRegister }: any) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.Container>
      <S.ImageLogin>
        <img src={BannerRegister} alt="Imagem de registro" />
      </S.ImageLogin>
      <S.LoginWrapper>
        <S.LogoWrapper>
          <img src={Logo} alt="Logo" />
          <Typography variant="body2" color="#49504E">
            Faça seu cadastro
          </Typography>
        </S.LogoWrapper>
        <Typography
          sx={{
            width: { xs: "80%", md: "600px" },
            margin: { xs: "0 auto", md: "50px 0 0 0" },
          }}
          variant="h6"
        >
          E-mail
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: { xs: "80%", md: "600px" },
            margin: { xs: "0 0 0 0", md: "0 0 0 0" },
          }}
          fullWidth
        />
        <Typography
          sx={{
            width: { xs: "80%" },
            margin: { xs: "0 auto", md: "50px 0 0 430px" },
          }}
          variant="h6"
        >
          Senha
        </Typography>
        <TextField
          label="Senha"
          variant="outlined"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: { xs: "80%", md: "600px" },
            margin: { xs: "0 auto", md: "0 0 0 0" },
          }}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading || !email || !password}
          sx={{ width: { xs: "80%", md: "600px" }, marginTop: "20px" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <Divider
          variant="inset"
          sx={{
            width: { xs: "90%", md: "600px" },
            margin: { xs: "20px auto", md: "50px 0 60px 0" },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={onToggleRegister}
          sx={{
            width: { xs: "80%", md: "600px" },
            marginBottom: "20px",
          }}
        >
          Não tem uma conta? Cadastre-se
        </Button>
      </S.LoginWrapper>
    </S.Container>
  );
};
