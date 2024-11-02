import * as S from "./styles";
import { Button, Divider, TextField, Typography } from "@mui/material";

export const LoginForm = ({ onToggleRegister }: any) => {
  return (
    <S.Container>
      <S.LoginWrapper>
        <Typography
          sx={{
            width: { xs: "80%", md: "600px" },
            margin: { xs: "0 auto", md: "50px 0 0 0" },
          }}
          variant="h6"
        >
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Digite seu Email"
          sx={{
            width: { xs: "80%", md: "600px" },
            margin: { xs: "0 auto", md: "0 0 0 0" },
          }}
          fullWidth
        />
        <Typography
          sx={{
            width: { xs: "80%" },
            margin: { xs: "0 auto", md: "50px 0 0 0" },
          }}
          variant="h6"
        >
          Senha
        </Typography>
        <TextField
          label="Senha"
          variant="outlined"
          placeholder="Digite sua senha"
          sx={{
            width: { xs: "80%", md: "600px" },
            margin: { xs: "0 auto", md: "50px 0 0 0" },
          }}
          fullWidth
        />
      </S.LoginWrapper>
      <S.ButtonsForm>
        <Button
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
      </S.ButtonsForm>
      <Divider
        variant="inset"
        sx={{
          width: { xs: "90%", md: "600px" },
          margin: { xs: "20px auto", md: "50px 0 60px 100px" },
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={onToggleRegister}
        sx={{
          width: { xs: "80%"},
          margin: { xs: "0 0 40px 40px", md: "0 0 0 50px" },
        }}
      >
        Nao tem uma conta? Cadastre-se
      </Button>
    </S.Container>
  );
};
