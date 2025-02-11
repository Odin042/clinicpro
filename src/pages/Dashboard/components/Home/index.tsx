import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PatientRegistrationModal from "./components/PatientResgistrationModal";
import useUserByEmail from "../../hook/useGetUsers";

const appointmentsMock = [
  {
    id: 1,
    name: "Maria Silva",
    date: "07/02/2025",
    time: "10:00",
    type: "Retorno",
  },
  {
    id: 2,
    name: "João Santos",
    date: "07/02/2025",
    time: "11:00",
    type: "Novo",
  },
  {
    id: 3,
    name: "Ana Souza",
    date: "08/02/2025",
    time: "09:30",
    type: "Retorno",
  },
  {
    id: 4,
    name: "Carlos Mendes",
    date: "08/02/2025",
    time: "14:00",
    type: "Novo",
  },
];

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  })
  const { user, loading, error, refetch } = useUserByEmail(email)

  console.log(user)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch()
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Stack spacing={2} direction="row" sx={{ height: "100%", width: "100%" }}>
      <Stack
        spacing={2}
        sx={{
          width: "20%",
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          padding: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
            <Box
              component="img"
              src={'https://m.media-amazon.com/images/I/61V0JvfDTaL._AC_UF1000,1000_QL80_.jpg'}
              alt="Logo"
              sx={{
                width: 200,
                height: 300,
                borderRadius: "10%",
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
        </Box>
        <Box>
          <Typography variant="h6">{user?.username}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.speciality}
          </Typography>
        </Box>
        <Button variant="contained" fullWidth>
          Meu consultório
        </Button>
        <Divider />
      </Stack>

      <Stack flex={1} spacing={2}>
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            p: 1,
            border: "1px solid #ddd",
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "#fafafa",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontWeight: "bold", color: "#00008B" }}
          >
            Olá, {user?.username}. Boas-vindas ao Clinic360Pro
          </Typography>
          <TextField
            size="medium"
            placeholder="Pesquise pacientes e recursos"
            fullWidth
            sx={{ maxWidth: "80%" }}
          />
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              sx={{ minWidth: 120 }}
              onClick={handleOpenModal}
            >
              Adicionar paciente
            </Button>
            <Button
              variant="outlined"
              startIcon={<PeopleIcon />}
              sx={{ minWidth: 120 }}
            >
              Meus pacientes
            </Button>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{ minWidth: 120 }}
            >
              Minha agenda
            </Button>
          </Stack>
        </Stack>

        <PatientRegistrationModal
          open={isModalOpen}
          onClose={handleCloseModal}
        />

        <Stack spacing={2} sx={{ p: 1 }}>
          <Stack
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              p: 2,
            }}
            spacing={2}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" fontWeight="bold">
                Agendamentos
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="text">Ver toda agenda</Button>
                <Button variant="contained" color="primary">
                  Novo agendamento
                </Button>
              </Stack>
            </Stack>
            <Divider />

            {appointmentsMock.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                Nenhum agendamento para hoje.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {appointmentsMock.map((appointment) => (
                  <Box
                    key={appointment.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1,
                      bgcolor: "#f9f9f9",
                      borderRadius: 2,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar>
                        {appointment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Stack>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {appointment.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {appointment.date} - {appointment.time}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {appointment.type}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                      <IconButton>
                        <ChatBubbleOutlineIcon />
                      </IconButton>
                      <IconButton>
                        <PersonOutlineIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack
        spacing={2}
        sx={{
          width: "20%",
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          padding: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box>
          <Typography variant="h6">Clinic360</Typography>
          <TextField size="small" placeholder="Buscar tarefas" fullWidth />
        </Box>
        <Divider />
        <Box>
          <Typography variant="h6">Diário</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Home;
