import React, { useContext, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Avatar,
  IconButton,
  Chip,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PatientRegistrationModal from "./components/PatientResgistrationModal";
import { useGetUsers } from "../../../hook/useGetUsers";
import { AuthContext } from "../../../../AuthContext";
import { ControlPointSharp } from "@mui/icons-material";
import AppointmentModal from "./components/AppointmentsModal";
import useGetAppointments from "../../../hook/useGetAppointments";

import { format } from "date-fns";
import useGetPatient from "../../../hook/useGetPatient";

const Home = () => {
  const [isPatientResgistrationModalOpen, setPatientResgistrationModalOpen] =
    useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const { firebaseUser, backendUser, loading } = useContext(AuthContext);
  const { appointments, loading: loadingAppointments } = useGetAppointments();
  const { patients, loading: loadingPatients } = useGetPatient();

  const getPatientNameById = (id: number) => {
    const foundPatient = patients.find((p) => p.id === id);
    return foundPatient ? foundPatient.name : "Paciente não encontrado";
  };

  const handleOpenModal = () => setPatientResgistrationModalOpen(true);
  const handleCloseModal = () => setPatientResgistrationModalOpen(false);

  const handleOpenAppointmentModal = () => setIsAppointmentModalOpen(true);
  const handleCloseAppointmentModal = () => setIsAppointmentModalOpen(false);

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
            src={""}
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
          <Typography variant="h6">{backendUser?.username}</Typography>
          <Typography variant="body2" color="textSecondary">
            {backendUser?.speciality}
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
            Olá, {backendUser?.username}. Boas-vindas ao Clinic360Pro
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
          open={isPatientResgistrationModalOpen}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenAppointmentModal}
                >
                  Novo agendamento
                </Button>
              </Stack>
            </Stack>
            <Divider />
            <AppointmentModal
              open={isAppointmentModalOpen}
              onClose={handleCloseAppointmentModal}
            />
            {appointments.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                Nenhum agendamento para hoje.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {appointments.map((appointment) => {
                  const patientName = getPatientNameById(
                    appointment.patient_id
                  );
                  const start = format(
                    new Date(appointment.start_time),
                    "dd/MM/yyyy HH:mm"
                  );
                  const end = format(
                    new Date(appointment.end_time),
                    "dd/MM/yyyy HH:mm"
                  );
                  return (
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
                          {patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <Stack>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {patientName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {start} - {end}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <Chip
                              label={appointment.service}
                              variant="outlined"
                              sx={{
                                borderColor:
                                  appointment.service === "CONSULTATION"
                                    ? "#4CAF50" 
                                    : appointment.service === "RETURN"
                                    ? "#FF9800" 
                                    : "#2196F3", 
                                color:
                                  appointment.service === "CONSULTATION"
                                    ? "#4CAF50"
                                    : appointment.service === "RETURN"
                                    ? "#FF9800"
                                    : "#2196F3",
                              }}
                            />
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
                  );
                })}
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
