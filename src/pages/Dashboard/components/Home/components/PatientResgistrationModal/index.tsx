import React from "react"
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import InputMask from "react-input-mask"
import { toast } from "react-toastify"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientSchema } from "../../../../Schema/patientSchema"
import { z } from "zod"
import { useCreatePatient } from "../../../../../Register/hooks/useCreatePatient"
import { useGetPatients } from "../../../../../hook/useGetPatients"
import { getAuth } from "firebase/auth"


type PatientFormData = z.infer<typeof patientSchema>

interface PatientFormModalProps {
  open: boolean
  onClose: () => void
}

const PatientRegistrationModal = ({ open, onClose }: PatientFormModalProps) => {
  const { createPatient, loading, error } = useCreatePatient()
  const { patients, setPatients, fetchPatients } = useGetPatients()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    register,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      birthday: "",
      gender: "",
      isPregnant: false,
      email: "",
      whatsapp: "",
      place_of_service: "",
      occupation: "",
      cpf_cnpj: "",
      rg: "",
      address: "",
      health_plan: "",
      weight: "",
      height: "",
    },
  })

  const onSubmit = async (data: PatientFormData) => {
    try {
      const response = await createPatient(data)
      toast.success("Paciente criado com sucesso")
      setPatients([...patients, response]) 
  

      const auth = getAuth()
      const currentUser = auth.currentUser
      if (currentUser) {
        const token = await currentUser.getIdToken()
        await fetchPatients(token)
      }
  
      onClose()
      reset()
    } catch (err) {
      toast.error("Erro inesperado. Tente novamente")
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
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Adicionar Novo Paciente
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Nome Completo"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
              <TextField
                label="Data de Nascimento"
                type="date"
                {...register("birthday")}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Sexo</InputLabel>
                <Select
                  label="Sexo"
                  {...register("gender")}
                  value={watch("gender")}
                  onChange={(e) => register("gender").onChange(e)}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography color="error" variant="caption">
                    {errors.gender?.message}
                  </Typography>
                )}
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("isPregnant")}
                    checked={watch("isPregnant")}
                    disabled={watch("gender") === "Masculino"}
                  />
                }
                label="Gestante"
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="E-mail"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
              <Controller
                name="whatsapp"
                control={control}
                render={({ field }) => (
                  <InputMask mask="(99) 99999-9999" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label="WhatsApp"
                        error={!!errors.whatsapp}
                        helperText={errors.whatsapp?.message}
                        fullWidth
                      />
                    )}
                  </InputMask>
                )}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Local de Atendimento"
                {...register("place_of_service")}
                error={!!errors.place_of_service}
                helperText={errors.place_of_service?.message}
                fullWidth
              />
              <TextField
                label="Ocupação"
                {...register("occupation")}
                error={!!errors.occupation}
                helperText={errors.occupation?.message}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Controller
                name="cpf_cnpj"
                control={control}
                render={({ field }) => (
                  <InputMask mask="999.999.999-99" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        label="CPF"
                        error={!!errors.cpf_cnpj}
                        helperText={errors.cpf_cnpj?.message}
                        fullWidth
                      />
                    )}
                  </InputMask>
                )}
              />
              <TextField
                label="RG"
                {...register("rg")}
                error={!!errors.rg}
                helperText={errors.rg?.message}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Endereço"
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Plano de Saúde / Nº"
                {...register("health_plan")}
                error={!!errors.health_plan}
                helperText={errors.health_plan?.message}
                fullWidth
              />
              <TextField
                label="Peso (kg)"
                {...register("weight")}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                fullWidth
              />
              <TextField
                label="Altura (m)"
                {...register("height")}
                error={!!errors.height}
                helperText={errors.height?.message}
                fullWidth
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default PatientRegistrationModal
