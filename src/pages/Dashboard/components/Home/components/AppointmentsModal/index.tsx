import React from "react"
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  appointmentSchema,
  AppointmentFormData,
} from "../../../../Schema/appointmentSchema"
import useGetPatient from "../../../../../hook/useGetPatients"
import { useCreateAppointments } from "../../../../../Register/hooks/useCreateAppointments"
import { useTheme } from "@mui/material/styles"
import { toast } from "react-toastify"
import useGetAppointments from "../../../../../hook/useGetAppointments"
import { getAuth } from "firebase/auth"



interface AppointmentModalProps {
  open: boolean
  onClose: () => void
}

const TYPE_MAP: Record<string, string> = {
  consulta: "CONSULTATION",
  retorno: "RETURN",
  previsao_retorno: "EXPECTED_RETURN",
  outros: "OTHER",
}

const SITUATION_MAP: Record<string, string> = {
  confirmada: "CONFIRMED",
  desmarcada: "CANCELED",
  pendente: "PENDING",
}

const AppointmentModal = ({ open, onClose }: AppointmentModalProps) => {
  const { patients, loading: loadingPatients } = useGetPatient()
  const { createAppointments , loading, error } = useCreateAppointments()
  const { appointments, setAppointments, fetchAppointments } = useGetAppointments()

  const theme = useTheme()



  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: "consulta",
      situation: "pendente",
      patientId: 0,
      placeOfService: "",
      service: "",
      startDate: "",
      endDate: "",
      timeZone: "UTC-03",
      description: "",
    },
  })

  const selectedBtnStyles = {
    backgroundColor: "primary.main",
    color: "#fff",
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  }

  const unselectedBtnStyles = {
    backgroundColor: "grey.100",
    color: "text.primary",
    "&:hover": {
      backgroundColor: "grey.200",
    },
  }

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const response = await createAppointments({
        patient_id: Number(data.patientId),
        type: TYPE_MAP[data.type],
        status: SITUATION_MAP[data.situation],
        place_of_service: data.placeOfService,
        service: data.service,
        start_time: data.startDate,
        end_time: data.endDate,
        timezone: data.timeZone,
        description: data.description,
      })
  
      toast.success("Agendamento criado com sucesso")
      setAppointments([...appointments, response]) 
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (currentUser) {
        const token = await currentUser.getIdToken()
        await fetchAppointments(token) 
      }
  
      onClose()
      reset()
    } catch (error) {
      toast.error("Erro ao criar agendamento")
    }
  }
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" mb={2} fontWeight={700}>
          Agendamento
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ mb: 1, fontWeight: 600 }}>Tipo</Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup sx={{ mb: 2 }}>
                <Button
                  onClick={() => field.onChange("consulta")}
                  sx={
                    field.value === "consulta"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Consulta
                </Button>
                <Button
                  onClick={() => field.onChange("retorno")}
                  sx={
                    field.value === "retorno"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Retorno
                </Button>
                <Button
                  onClick={() => field.onChange("previsao_retorno")}
                  sx={
                    field.value === "previsao_retorno"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Previsão de retorno
                </Button>
                <Button
                  onClick={() => field.onChange("outros")}
                  sx={
                    field.value === "outros"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Outros
                </Button>
              </ButtonGroup>
            )}
          />

          <Typography fontWeight={700}>Situação</Typography>
          <Controller
            name="situation"
            control={control}
            render={({ field }) => (
              <ButtonGroup sx={{ mb: 2, mt: 1 }}>
                <Button
                  onClick={() => field.onChange("confirmada")}
                  sx={
                    field.value === "confirmada"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Consulta confirmada
                </Button>
                <Button
                  onClick={() => field.onChange("desmarcada")}
                  sx={
                    field.value === "desmarcada"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Desmarcada
                </Button>
                <Button
                  onClick={() => field.onChange("pendente")}
                  sx={
                    field.value === "pendente"
                      ? selectedBtnStyles
                      : unselectedBtnStyles
                  }
                >
                  Pendente
                </Button>
              </ButtonGroup>
            )}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-patient">Selecione um Paciente</InputLabel>
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="select-patient"
                  label="Paciente"
                  error={!!errors.patientId}
                >
                  {!loadingPatients &&
                    patients.map((patient) => (
                      <MenuItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>

          <TextField
            fullWidth
            label="Local de atendimento"
            sx={{ mt: 2 }}
            {...register("placeOfService")}
            error={!!errors.placeOfService}
          />

          <TextField
            fullWidth
            label="Serviço"
            sx={{ mt: 2 }}
            {...register("service")}
            error={!!errors.service}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Início"
              type="datetime-local"
              fullWidth
              {...register("startDate")}
              error={!!errors.startDate}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Fim"
              type="datetime-local"
              fullWidth
              {...register("endDate")}
              error={!!errors.endDate}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <TextField
            fullWidth
            label="Fuso horário"
            sx={{ mt: 2 }}
            {...register("timeZone")}
            error={!!errors.timeZone}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descrição"
            sx={{ mt: 2 }}
            {...register("description")}
            error={!!errors.description}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 4 }}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default AppointmentModal
