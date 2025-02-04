import { useState } from "react"
import { Button, TextField, Typography, Stack } from "@mui/material"
import { useNavigate, useSearchParams } from "react-router-dom"
import { auth } from "../../config/firebasedatabase"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import Logo from "../../assets/clinicpro.png"
import { toast } from "react-toastify"

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const oobCode = searchParams.get("oobCode")

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.")
      return
    }

    if (!oobCode) {
      toast.error("Código de redefinição inválido ou expirado.")
      return
    }

    setLoading(true)
    try {
      await verifyPasswordResetCode(auth, oobCode) 
      await confirmPasswordReset(auth, oobCode, newPassword) 
      toast.success("Senha redefinida com sucesso! Faça login com sua nova senha.")
      navigate("/login")
    } catch (err: any) {
      console.error("Erro ao redefinir senha:", err)
      toast.error("Erro ao redefinir senha. O código pode ter expirado.")
    } finally {
      setLoading(false)
    }
  }

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
        <Typography variant="h4" color="textPrimary">
          Redefinir Senha
        </Typography>

        <Typography variant="body1" textAlign="center">
          Insira uma nova senha para sua conta.
        </Typography>

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Nova Senha"
          variant="outlined"
          type="password"
          placeholder="Digite sua nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Confirmar Nova Senha"
          variant="outlined"
          type="password"
          placeholder="Confirme sua nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
          disabled={loading || !newPassword || !confirmPassword}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {loading ? "Redefinindo..." : "Redefinir Senha"}
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
  )
}
