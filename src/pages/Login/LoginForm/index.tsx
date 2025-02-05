import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Box
} from "@mui/material";
import { auth } from "../../../config/firebasedatabase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../../assets/clinic360prologo.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          px: 4,
        }}
      >
        <img src={Logo} alt="Logo" style={{ maxWidth: 200 }} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          Bem-vindo ao Clinic360
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", maxWidth: "500px", mt: 2 }}
        >
          Faça login para acessar sua conta e gerenciar seus pacientes, agendamentos e muito mais.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          bgcolor: "#fff",
          p: 4,
          maxWidth: { xs: "100%", sm: "400px" },
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !email.includes("@")} 
          helperText={!!error && !email.includes("@") ? "Insira um email válido." : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error && password.length < 6}
          helperText={!!error && password.length < 6 ? "Senha muito curta." : ""}
          sx={{ mb: 2 }}
        />
        <Button variant="text" color="primary" onClick={() => navigate("/forgot-password")} sx={{ mb: 2 }}>
          Esqueceu sua senha?
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading || !email || !password}
          sx={{ width: "100%", mb: 2 }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
          sx={{ width: "100%" }}
        >
          Não tem uma conta? Cadastre-se
        </Button>
      </Box>
    </Stack>
  );
};
