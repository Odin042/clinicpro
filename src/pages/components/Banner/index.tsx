import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import BannerImg from "../../../assets/banner.jpg";
import BannerTitleImg from "../../../assets/clinic360prologo.png"

export const Banner = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Title>
        <img src={BannerTitleImg} alt="Banner" />
        <Typography variant="h3">
          Seja Bem-Vindo ao <strong>CLINIC360</strong>{" "}
        </Typography>
        <Typography variant="h6" sx={{ alignItems: "flex-start" }}>
          A maior plataforma de gestão de consultórios do Brasil.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "10px",
            display: { xs: "none", sm: "block" },
          }}
          onClick={() => navigate("/register")}
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
