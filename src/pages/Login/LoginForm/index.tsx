import { useState } from "react"
import * as S from "./styles"
import { Button, Divider, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { auth } from "../../../config/firebasedatabase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Logo from "../../../assets/clinic360logo.png"
import BannerRegister from "../../../assets/bannerregister.jpg"

interface LoginProps {
  onToggleRegister: () => void
}

export const Login: React.FC<LoginProps> = ({ onToggleRegister }) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError(null)
    if (!email.includes("@")) {
      setError("Por favor, insira um email válido.")
      return
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/dashboard")
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado. Verifique o email digitado.")
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.")
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente mais tarde.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.ImageLogin>
        <img src={BannerRegister} alt="Imagem de registro" />
      </S.ImageLogin>
      <S.LoginWrapper>
        <S.LogoWrapper>
          <img src={Logo} alt="Logo Clinic360" />
          <Typography variant="body2" color="#49504E">
            Faça seu Login
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
          fullWidth
          error={!!error && !email.includes("@")}
          helperText={!!error && !email.includes("@") ? "Insira um email válido." : ""}
          sx={{
            width: { xs: "80%", md: "600px" },
          }}
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
          fullWidth
          error={!!error && password.length < 6}
          helperText={!!error && password.length < 6 ? "Senha muito curta." : ""}
          sx={{
            width: { xs: "80%", md: "600px" },
          }}
        />
        {error && (
          <Typography
            color="error"
            sx={{ marginTop: "10px", textAlign: "center" }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading || !email || !password}
          sx={{
            width: { xs: "80%", md: "600px" },
            marginTop: "20px",
          }}
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
  )
}
