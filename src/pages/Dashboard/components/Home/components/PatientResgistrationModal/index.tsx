import React from "react"
import { Modal, Box, Typography, TextField, Button, Stack, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

interface PatientFormModalProps {
  open: boolean
  onClose: () => void
}

const PatientRegistrationModal: React.FC<PatientFormModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          Adicionar Novo Paciente
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField label="Nome Completo" fullWidth />
            <TextField label="Data de Nascimento" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl >
              <InputLabel>Sexo</InputLabel>
              <Select sx={{ minWidth: 260 }}>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox />} label="Gestante" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="E-mail" fullWidth />
            <TextField label="WhatsApp" fullWidth />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="Local de Atendimento" fullWidth />
            <TextField label="Ocupação" fullWidth />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="CPF" fullWidth />
            <TextField label="RG" fullWidth />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="Endereço" fullWidth />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="Plano de Saúde / N°" fullWidth />
            <TextField label="Peso (kg)" fullWidth />
            <TextField label="Altura (m)" fullWidth />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Salvar
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default PatientRegistrationModal
