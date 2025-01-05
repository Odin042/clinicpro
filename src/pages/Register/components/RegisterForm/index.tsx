import { useState } from "react"
import * as S from "./styles"
import { Button, TextField, Typography } from "@mui/material"
import { Speciality } from "./Speciality"
import { useCreateUser } from "../../hooks/useCreateUser"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { registerFormSchema } from "../../../schemas/RegisterSchema"
import { ZodError } from "zod"

export const RegisterForm = () => {
  const { createUser, loading } = useCreateUser()
  const [errors, setErrors] = useState<FormErrors>({
    speciality: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    speciality: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  type FormErrors = {
    speciality?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  };

  const handleSave = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "As senhas não coincidem." });
      return;
    }
  
    try {

      registerFormSchema.parse(formData);
  
      const { speciality, username, email, password, confirmPassword } = formData;
  
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
      setErrors({});
      navigate("/");
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: FormErrors = {};
        err.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof FormErrors;
          fieldErrors[fieldName] = error.message;
        })
        setErrors(fieldErrors);
      } else {
        console.error("Erro ao criar usuário", err);
        toast.error("Erro inesperado. Tente novamente.");
      }
    }
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
                setErrors({ ...errors, speciality: "" })
              }}
            />
            {errors.speciality && (
              <Typography color="error">{errors.speciality}</Typography>
            )}
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
              error={!!errors.username}
              helperText={errors.username}
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
            error={!!errors.email}
            helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
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
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
