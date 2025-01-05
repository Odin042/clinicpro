import { useState } from "react"
import * as S from "./styles"
import { Button, Divider, TextField, Typography } from "@mui/material"
import useLogin from "../../hooks/useLoginUser"
import { useNavigate } from "react-router-dom"

export const LoginForm = ({ onToggleRegister }: any) => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const { login, loading } = useLogin()

  const handleLogin = async () => {
    try {
      await login(email, password)
      navigate('/dashboard') 
    } catch (err) {
      console.error(err)
    }
  }

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleLogin}
          disabled={loading || !email || !password}
          sx={{ width: { xs: "80%" } }}
        >
          {loading ? "Entrando..." : "Entrar"}
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
          width: { xs: "80%" },
          margin: { xs: "0 0 40px 40px", md: "0 0 0 50px" },
        }}
      >
        Não tem uma conta? Cadastre-se
      </Button>
    </S.Container>
  )
}
