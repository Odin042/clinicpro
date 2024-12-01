import { useState } from "react";
import * as S from "./styles";
import { Button, TextField, Typography } from "@mui/material";
import { Speciality } from "./Speciality";
import { useCreateUser } from "../../hooks/useCreateUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const { createUser, loading } = useCreateUser()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    speciality: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const { speciality, username, email, password, confirmPassword } = formData;

    try {
      await createUser({
        speciality,
        username,
        email,
        password,
        confirmPassword,
      });
      toast.success("Usuário criado com sucesso!");
      setFormData({
        speciality: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Erro ao criar usuário", err);
    }

    navigate('/') 
  }

  return (
    <S.Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Cadastro
      </Typography>
      <S.FormRegister>
        <S.InputsRow>
          <S.InputsRegister>
            <Speciality
              value={formData.speciality}
              onChange={(newValue) => {
                setFormData({ ...formData, speciality: newValue })
              }}
            />
          </S.InputsRegister>
          <S.InputsRegister>
            <Typography variant="h6">Nome</Typography>
            <TextField
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              placeholder="Digite seu nome"
              sx={{ width: { xs: "100%", md: "600px" } }}
            />
          </S.InputsRegister>
        </S.InputsRow>
        <S.InputsRegister>
          <Typography variant="h6">Email</Typography>
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            placeholder="Digite seu email"
            sx={{ width: { xs: "100%", md: "600px" } }}
            type="email"
          />
        </S.InputsRegister>
        <S.InputsRow>
          <S.InputsRegister>
            <Typography variant="h6">Senha</Typography>
            <TextField
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              variant="outlined"
              placeholder="Digite sua senha"
              sx={{ width: { xs: "100%", md: "600px" } }}
            />
          </S.InputsRegister>
          <S.InputsRegister>
            <Typography variant="h6">Confirmar Senha</Typography>
            <TextField
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              variant="outlined"
              placeholder="Confirme sua senha"
              sx={{ width: { xs: "100%", md: "600px" } }}
            />
          </S.InputsRegister>
        </S.InputsRow>
        <Button
          variant="contained"
          sx={{ width: { xs: "100%", md: "200px" } }}
          disabled={loading}
          onClick={handleSave}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </S.FormRegister>
    </S.Container>
  );
};
