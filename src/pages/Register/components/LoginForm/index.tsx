import * as S from "./styles";
import { Button, Divider, TextField, Typography } from "@mui/material";

export const LoginForm = ({ onToggleRegister }: any) => {
  return (
    <S.Container>
      <S.LoginWrapper>
        <Typography variant="h6">Login</Typography>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="Digite seu Email"
          fullWidth
        />
        <Typography variant="h6">Senha</Typography>
        <TextField
          label="Senha"
          variant="outlined"
          placeholder="Digite sua senha"
          fullWidth
        />
      </S.LoginWrapper>
      <S.ButtonsForm>
        <Button variant="contained" color="primary">
          Entrar
        </Button>
      </S.ButtonsForm>
      <Divider
        variant="inset"
        sx={{ width: "600px", margin: "50px 0 60px 300px" }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={onToggleRegister}
        sx={{ width: "600px", margin: "0 0 0 320px" }}
      >
        Nao tem uma conta? Cadastre-se
      </Button>
    </S.Container>
  );
};
