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
import {
  formatCpfCnpj,
  formatPhone,
  formatCrm,
} from "../../../../utils/formats";

export const RegisterForm = () => {
  const { createUser, loading } = useCreateUser();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      speciality: "",
      username: "",
      registerUf: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf_cnpj: "",
      register: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      toast.success("Usuário criado com sucesso");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Erro inesperado. Tente novamente");
    }
  };

  return (
    <S.Container>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Cadastro
      </Typography>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={{ xs: 2, md:8 , xl: 15 }}>
        <Stack
          direction={{ xs: "column", sm: "row", md: "column" }}
          spacing={{ xs: 2,  xl: 5 }}
        >
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
          <Stack>
            <Typography variant="h6">CPF ou CNPJ</Typography>
            <Controller
              name="cpf_cnpj"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CPF ou CNPJ"
                  variant="outlined"
                  sx={{
                    width: { xs: "90%", sm: "170%", md: "150%" },
                  }}
                  error={!!errors.cpf_cnpj}
                  helperText={errors.cpf_cnpj?.message}
                  onChange={(e) =>
                    field.onChange(formatCpfCnpj(e.target.value))
                  }
                />
              )}
            />
          </Stack>
          </Stack>
          <Stack>
            <Typography variant="h6">Registro do conselho</Typography>
            <Controller
              name="register"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registro do conselho"
                  variant="outlined"
                  sx={{
                    width: { xs: "90%", sm: "180%", md: "100%" },
                  }}
                  placeholder="123456/UF"
                  slotProps={{ htmlInput: { maxLength: 9 } }}
                  error={!!errors.register}
                  helperText={errors.register?.message}
                  onChange={(e) => field.onChange(formatCrm(e.target.value))}
                />
              )}
            />
          </Stack>
          <Stack>
            <Typography variant="h6">UF</Typography>
            <Controller
              name="registerUf"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.registerUf}
                >
                  <InputLabel>UF</InputLabel>
                  <Select
                    {...field}
                    sx={{
                      width: { xs: "90%", sm: "170%", md: "180%" },
                    }}
                    label="UF"
                  >
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
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
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
    </S.Container>
  )
}
