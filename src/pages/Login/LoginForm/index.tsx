import { useState } from "react";
import {
  Button,
  Divider,
  TextField,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebasedatabase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../../assets/clinicpro.png";
import BannerRegister from "../../../assets/bannerregister.jpg";

interface LoginProps {
  onToggleRegister?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onToggleRegister }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    if (!email.includes("@")) {
      setError("Por favor, insira um email válido.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado. Verifique o email digitado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.");
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <img
          src={BannerRegister}
          alt="Imagem de registro"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Stack
        direction="column"
        alignItems="center"
        sx={{
          flex: 1,
          padding: { xs: 2, md: 4 },
          maxWidth: "600px",
          height: "100%",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Stack alignItems="center" sx={{ mb: 4 }}>
          <img src={Logo} alt="Logo Clinic360" style={{ maxWidth: "150px" }} />
          <Typography variant="body2" color="#49504E">
            Faça seu Login
          </Typography>
        </Stack>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          variant="outlined"
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={!!error && !email.includes("@")}
          helperText={
            !!error && !email.includes("@") ? "Insira um email válido." : ""
          }
          sx={{ mb: 2 }}
        />

        <TextField
          label="Senha"
          variant="outlined"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={!!error && password.length < 6}
          helperText={
            !!error && password.length < 6 ? "Senha muito curta." : ""
          }
          sx={{ mb: 2 }}
        />

        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/forgot-password")}
          sx={{ mb: 2 }}
        >
          Esqueceu sua senha?
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading || !email || !password}
          sx={{ mb: 2, width: "100%" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <Divider sx={{ width: "100%", mb: 2 }} />

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
          sx={{ width: "100%" }}
        >
          Não tem uma conta? Cadastre-se
        </Button>
      </Stack>
    </Stack>
  );
};
