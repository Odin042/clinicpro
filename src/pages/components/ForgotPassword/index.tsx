import { useState } from "react";
import { Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebasedatabase";
import { sendPasswordResetEmail } from "firebase/auth";
import Logo from "../../../assets/clinic360logo.png";
import BannerRegister from "../../../assets/bannerregister.jpg"
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email.includes("@")) {
      toast.error("Por favor, insira um email válido.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Um e-mail de redefinição de senha foi enviado. Verifique sua caixa de entrada.");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        toast.error("Usuário não encontrado. Verifique o email digitado.");
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{
        height: "100vh",
        padding: { xs: 2, md: 4 },
        backgroundColor: "#f5f5f5",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{
          backgroundColor: "white",
          padding: { xs: 3, md: 4 },
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: "100%", sm: "400px", md: "500px" },
        }}
      >
        <img src={Logo} alt="Logo Clinic360" width="150" />
        <Typography variant="h6" color="textSecondary">
          Recuperar Senha
        </Typography>

        <Typography variant="body1" textAlign="center">
          Insira o e-mail associado à sua conta para receber um link de redefinição de senha.
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={!email.includes("@")}
          helperText={!email.includes("@") ? "Insira um email válido." : ""}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
          disabled={loading || !email}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>

        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/login")}
          fullWidth
        >
          Voltar para o Login
        </Button>
      </Stack>
    </Stack>
  );
}