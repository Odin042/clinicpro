import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Typography,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Speciality } from "./Speciality";
import { useCreateUser } from "../../hooks/useCreateUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/clinic360prologo.png";
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
    formState: { errors },
    trigger,
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
      gender: "",
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
      gender,
      register,
      phone,
      uf,
    } = data;

    try {
      await createUser(email, password, {
        speciality,
        username,
        cpf_cnpj,
        gender,
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        width: "100vw",
        height: "100vh",
        overflowY: { xs: "auto", sm: "hidden" },
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
          sx={{
            textAlign: "center",
            maxWidth: "500px",
            mt: 2,
          }}
        >
          Cadastre-se e tenha acesso a um sistema completo de gestão de
          consultórios. Gerencie pacientes, agendamentos e muito mais com
          facilidade.
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
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 3,
            mt: { xs: 2, sm: 0 },
          }}
        >
          Cadastro
        </Typography>
          <Stack spacing={3}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="cpf_cnpj"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CPF ou CNPJ"
                    fullWidth
                    error={!!errors.cpf_cnpj}
                    helperText={errors.cpf_cnpj?.message}
                    onChange={(e) =>
                      field.onChange(formatCpfCnpj(e.target.value))
                    }
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    onChange={(e) =>
                      field.onChange(formatPhone(e.target.value))
                    }
                  />
                )}
              />
            </Stack>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel id="gender-label">Sexo</InputLabel>
                  <Select {...field} labelId="gender-label" label="Sexo">
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Prefiro não responder">
                      Prefiro não responder
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              gap={{ xs: 1, sm: 0 }}
            >
              <Controller
                name="register"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Registro do conselho"
                    fullWidth
                    placeholder="Digite apenas números"
                    error={!!errors.register}
                    helperText={errors.register?.message}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      field.onChange(numericValue);
                    }}
                  />
                )}
              />
              <Controller
                name="uf"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.uf}
                    sx={{ width: { xs: "100%", sm: "50px", md: "130px" } }}
                  >
                    <InputLabel>UF</InputLabel>
                    <Select {...field}>
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
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Senha"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirmar Senha"
                    type="password"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Stack>
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </Stack>
          </Stack>
      </Box>
    </Stack>
    </form>
  );
};
