import { useState } from "react";
import * as S from "./styles";
import { Button, TextField, Typography, Stack } from "@mui/material";
import { Speciality } from "./Speciality";
import { useCreateUser } from "../../hooks/useCreateUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerFormSchema } from "../../../schemas/RegisterSchema";
import { ZodError } from "zod";
import { formatCrm, formatPhone } from "../../../../utils/formats";

export const RegisterForm = () => {
  const { createUser, loading } = useCreateUser();
  const [errors, setErrors] = useState<FormErrors>({
    speciality: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf_cnpj: "",
    register: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    speciality: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf_cnpj: "",
    register: "",
    phone: "",
  });

  type FormErrors = {
    speciality?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    cpf_cnpj?: string;
    register?: string;
    phone?: string;
  };

  const formatCpfCnpj = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 11) {
      return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
    } else {
      return digits
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFormatCpfCnpj = (e) => {
    let { name, value } = e.target;

    if (name === "cpf_cnpj") {
      value = formatCpfCnpj(value);
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    setErrors({ ...errors, phone: "" });
  };

  const handleCrmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCrm = formatCrm(e.target.value) 
    setFormData({ ...formData, register: formattedCrm }) 
    setErrors({ ...errors, register: "" }) 
  }

  const handleSave = async () => {
    console.log("Tentando salvar:", formData) 
  
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "As senhas não coincidem." })
      return
    }
  
    try {
      console.log("Chamando createUser...") 
      registerFormSchema.parse(formData)
  
      const {
        speciality,
        username,
        email,
        password,
        confirmPassword,
        cpf_cnpj,
        register,
        phone,
      } = formData
  
      await createUser({
        speciality,
        username,
        email,
        password,
        confirmPassword,
        cpf_cnpj,
        register,
        phone,
      })
  
      toast.success("Usuário criado com sucesso!")
      console.log("Usuário criado com sucesso!")
  
      setFormData({
        speciality: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        cpf_cnpj: "",
        register: "",
        phone: "",
      })
      setErrors({
        speciality: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        cpf_cnpj: "",
        register: "",
        phone: "",
      })
      navigate("/")
    } catch (err) {
      console.error("Erro ao salvar:", err) // Registra o erro
      if (err instanceof ZodError) {
        const fieldErrors: FormErrors = {}
        err.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof FormErrors
          fieldErrors[fieldName] = error.message
        })
        setErrors(fieldErrors)
      } else {
        toast.error("Erro inesperado. Tente novamente.")
      }
    }
  }

  return (
    <S.Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Cadastro
      </Typography>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 18, xl: 30 }}
        >
          <Speciality
            value={formData.speciality}
            onChange={(newValue) => {
              setFormData({ ...formData, speciality: newValue });
              setErrors({ ...errors, speciality: "" });
            }}
            error={!!errors.speciality}
            helperText={errors.speciality}
          />
          <Stack>
            <Typography variant="h6">CPF ou CNPJ</Typography>
            <TextField
              name="cpf_cnpj"
              label="CPF ou CNPJ"
              value={formData.cpf_cnpj}
              onChange={handleFormatCpfCnpj}
              variant="outlined"
              sx={{
                width: { xs: "90%", sm: "170%" },
              }}
              slotProps={{ htmlInput: { maxLength: 18 } }}
              error={!!errors.cpf_cnpj}
              helperText={errors.cpf_cnpj}
            />
          </Stack>
          <Stack>
            <Typography variant="h6">Registro do conselho</Typography>
            <TextField
              name="register"
              label="Registro do conselho"
              variant="outlined"
              value={formData.register}
              onChange={handleCrmChange} 
              fullWidth
              placeholder="123456/UF"
              slotProps={{ htmlInput: { maxLength: 9 } }}
              error={!!errors.register}
              helperText={errors.register}
            />
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 35 }}
        >
          <Stack>
            <Typography variant="h6">Nome ou Empresa</Typography>
            <TextField
              name="username"
              fullWidth
              label="Nome"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              sx={{
                width: { xs: "90%", sm: "200%" },
              }}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Stack>
          <Stack>
            <Typography variant="h6">Telefone</Typography>
            <TextField
              name="phone"
              fullWidth
              label="Telefone"
              value={formData.phone}
              onChange={handlePhoneChange}
              variant="outlined"
              sx={{
                width: { xs: "90%" },
              }}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Stack>
        </Stack>
        <Typography variant="h6">E-mail</Typography>
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          fullWidth
          onChange={handleChange}
          variant="outlined"
          sx={{
            width: { xs: "90%" },
          }}
          error={!!errors.email}
          helperText={errors.email}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 20 }}
        >
          <Stack>
            <Typography variant="h6">Senha</Typography>
            <TextField
              name="password"
              label="Senha"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              sx={{
                width: { xs: "90%", sm: "150%" },
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Stack>
          <Stack>
            <Typography variant="h6">Confirme a senha</Typography>
            <TextField
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              fullWidth
              sx={{
                width: { xs: "90%", sm: "150%" },
              }}
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSave}
          sx={{ width: "50%", margin: { xs: "0 20px 0 0", sm: "0 0 0 0" } }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Stack>
    </S.Container>
  );
};
