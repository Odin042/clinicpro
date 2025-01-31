import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./styles";
import {
  Button,
  TextField,
  Typography,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Speciality } from "./Speciality";
import { useCreateUser } from "../../hooks/useCreateUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerFormSchema } from "../../../schemas/RegisterSchema";
import { estadosBrasileiros } from "../../../../mocks/states";
import { formatCpfCnpj, formatPhone } from "../../../../utils/formats";

export const RegisterForm = () => {
  const { createUser, loading } = useCreateUser();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      uf: "",
      speciality: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf_cnpj: "",
      register: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    const {
      email,
      password,
      speciality,
      username,
      cpf_cnpj,
      register,
      phone,
      uf,
    } = data;

    try {
      await createUser(email, password, {
        speciality,
        username,
        cpf_cnpj,
        register,
        phone,
        uf,
      });

      toast.success("Usuário criado com sucesso");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Erro inesperado. Tente novamente");
    }

    console.log(data);
  };

  return (
    <S.Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Cadastro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* Add your content here */}
        </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: { xs: "wrap" }, 
              justifyContent: "space-between",
              gap: { xs: 2, md: 4 },
            }}
          >
            <Stack sx={{ flex: 1, minWidth: "100%" }}>
              <Typography variant="h6">CPF ou CNPJ</Typography>
              <Controller
                name="cpf_cnpj"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CPF ou CNPJ"
                    variant="outlined"
                    fullWidth
                    error={!!errors.cpf_cnpj}
                    helperText={errors.cpf_cnpj?.message}
                    onChange={(e) =>
                      field.onChange(formatCpfCnpj(e.target.value))
                    }
                  />
                )}
              />
            </Stack>

            <Stack sx={{ flex: 1, minWidth: "100%" }}>
              <Controller
                name="speciality"
                control={control}
                render={({ field }) => (
                  <Speciality
                    {...field}
                    error={!!errors.speciality}
                    helperText={errors.speciality?.message}
                  />
                )}
              />
            </Stack>
                
            <Stack
  direction="row"
  spacing={2}
  sx={{
    flexWrap: { xs: "wrap" },
    justifyContent: "space-between",
    gap: { xs: 2, md: 4 },
  }}
>
  <Stack sx={{ flex: 1 }}>
    <Typography variant="h6">Registro do conselho</Typography>
    <Controller
      name="register"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label="Registro do conselho"
          variant="outlined"
          fullWidth
          placeholder="Digite apenas números"
          error={!!errors.register}
          helperText={errors.register?.message}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "")
            field.onChange(numericValue)
          }}
        />
      )}
    />
  </Stack>

  <Stack sx={{ flex: 1 }}>
    <Typography variant="h6">UF</Typography>
    <Controller
      name="uf"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" error={!!errors.uf}>
          <InputLabel>UF</InputLabel>
          <Select {...field} label="UF">
            {estadosBrasileiros.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  </Stack>
</Stack>
<Stack />
<Stack />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 35 }}
          >
            <Stack>
              <Typography variant="h6">Nome ou Empresa</Typography>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome"
                    fullWidth
                    variant="outlined"
                    sx={{
                      width: { xs: "90%", sm: "200%" },
                    }}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Stack>
            <Stack>
              <Typography variant="h6">Telefone</Typography>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefone"
                    fullWidth
                    variant="outlined"
                    sx={{
                      width: { xs: "90%" },
                    }}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    onChange={(e) =>
                      field.onChange(formatPhone(e.target.value))
                    }
                  />
                )}
              />
            </Stack>
          </Stack>
          <Typography variant="h6">E-mail</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                variant="outlined"
                sx={{
                  width: { xs: "90%" },
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 20 }}
          >
            <Stack>
              <Typography variant="h6">Senha</Typography>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Senha"
                    type="password"
                    fullWidth
                    variant="outlined"
                    sx={{
                      width: { xs: "90%", sm: "150%" },
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Stack>
            <Stack>
              <Typography variant="h6">Confirme a senha</Typography>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirmar Senha"
                    type="password"
                    fullWidth
                    sx={{
                      width: { xs: "90%", sm: "150%" },
                    }}
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ width: "20%", margin: { xs: "0 20px 0 0", sm: "0 0 0 0" } }}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Stack>
      </form>
    </S.Container>
  );
};
