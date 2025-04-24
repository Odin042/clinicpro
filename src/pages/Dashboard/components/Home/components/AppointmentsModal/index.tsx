import {
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentSchema,
  AppointmentFormData,
} from "../../../../Schema/appointmentSchema";
import { usePatients } from "../../../../../../hooks/useGetPatients";
import { useCreateAppointments } from "../../../../../../hooks/useCreateAppointments";
import { useUpdateAppointments } from "../../../../../../hooks/useUpdateAppointments";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  appointment?: Appointment;
}

const TYPE_MAP = {
  consulta: "CONSULTATION",
  retorno: "RETURN",
  previsao_retorno: "EXPECTED_RETURN",
  outros: "OTHER",
} as const;

const REVERSE_TYPE_MAP = Object.fromEntries(
  Object.entries(TYPE_MAP).map(([k, v]) => [v, k])
) as Record<string, keyof typeof TYPE_MAP>;

const STATUS_MAP = {
  confirmada: "CONFIRMED",
  desmarcada: "CANCELED",
  pendente: "PENDING",
} as const;

const REVERSE_STATUS_MAP = Object.fromEntries(
  Object.entries(STATUS_MAP).map(([k, v]) => [v, k])
) as Record<string, keyof typeof STATUS_MAP>;

export default function AppointmentModal({
  open,
  onClose,
  selectedDate,
  appointment,
}: AppointmentModalProps) {
  const { data: patients = [] } = usePatients();
  const createAppt = useCreateAppointments();
  const updateAppt = useUpdateAppointments();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
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
      online_service: false,
      startDate: "",
      endDate: "",
      timeZone: "UTC-03",
      description: "",
    },
  });

  useEffect(() => {
    if (appointment) {
      reset({
        type: REVERSE_TYPE_MAP[appointment.type],
        situation: REVERSE_STATUS_MAP[appointment.status],
        patientId: appointment.patient_id,
        placeOfService: appointment.place_of_service,
        service: appointment.service,
        online_service: appointment.online_service,
        startDate: appointment.start_time.slice(0, 16),
        endDate: appointment.end_time.slice(0, 16),
        timeZone: appointment.timezone,
        description: appointment.description,
      });
    } else if (selectedDate) {
      const startIso = selectedDate.toISOString().slice(0, 16);
      const endIso = new Date(selectedDate.getTime() + 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);
      reset({ ...getValues(), startDate: startIso, endDate: endIso });
    } else {
      reset();
    }
  }, [appointment, selectedDate, reset, getValues]);

  const onSubmit = async (form: AppointmentFormData) => {
    const payload = {
      patient_id: Number(form.patientId),
      type: TYPE_MAP[form.type],
      status: STATUS_MAP[form.situation],
      place_of_service: form.placeOfService,
      service: form.service,
      online_service: form.online_service,
      start_time: form.startDate,
      end_time: form.endDate,
      timezone: form.timeZone,
      description: form.description,
    };

    try {
      if (appointment) {
        await updateAppt.mutateAsync({ id: appointment.id, data: payload });
        toast.success("Agendamento atualizado");
      } else {
        await createAppt.mutateAsync(payload);
        toast.success("Agendamento criado");
      }
      onClose();
      reset();
    } catch {
      toast.error("erro ao salvar agendamento");
    }
  };

  const selectedBtnStyles = {
    backgroundColor: "primary.main",
    color: "#fff",
    "&:hover": { backgroundColor: "primary.dark" },
  };

  const unselectedBtnStyles = {
    backgroundColor: "grey.100",
    color: "text.primary",
    "&:hover": { backgroundColor: "grey.200" },
  };

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
          {appointment ? "Editar agendamento" : "Novo agendamento"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Tipo</Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup sx={{ mb: 2 }}>
                {["consulta", "retorno", "previsao_retorno", "outros"].map(
                  (t) => (
                    <Button
                      key={t}
                      onClick={() => field.onChange(t)}
                      sx={
                        field.value === t
                          ? selectedBtnStyles
                          : unselectedBtnStyles
                      }
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1).replace("_", " ")}
                    </Button>
                  )
                )}
              </ButtonGroup>
            )}
          />

          <Typography fontWeight={700}>Situação</Typography>
          <Controller
            name="situation"
            control={control}
            render={({ field }) => (
              <ButtonGroup sx={{ mb: 2, mt: 1 }}>
                {["confirmada", "desmarcada", "pendente"].map((s) => (
                  <Button
                    key={s}
                    onClick={() => field.onChange(s)}
                    sx={
                      field.value === s
                        ? selectedBtnStyles
                        : unselectedBtnStyles
                    }
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Button>
                ))}
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
                  {patients.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Stack sx={{ mt: 2 }} direction="row" spacing={1}>
            <TextField
              label="Local de atendimento"
              sx={{ flex: 1 }}
              {...register("placeOfService")}
              error={!!errors.placeOfService}
            />
            <Controller
              name="online_service"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Atendimento online"
                />
              )}
            />
          </Stack>

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
              cancelar
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={
                appointment ? updateAppt.isPending : createAppt.isPending
              }
            >
              salvar
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
