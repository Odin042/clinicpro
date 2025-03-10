import React, { useState } from "react";
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
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify"
import { useCreatePatient } from "../../../../../Register/hooks/useCreatePatient";

interface PatientFormModalProps {
  open: boolean;
  onClose: () => void;
}

const PatientRegistrationModal: React.FC<PatientFormModalProps> = ({
  open,
  onClose,
}) => {
  const { createPatient, loading, error } = useCreatePatient();

  const [formData, setFormData] = useState({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, gender: value as string }));
  };

  const handleSubmit = async () => {
    try {
      const patientData = {
        name: formData.name,
        birthday: formData.birthday, 
        gender: formData.gender,
        email: formData.email,
        whatsapp: formData.whatsapp,
        place_of_service: formData.place_of_service,
        occupation: formData.occupation,
        cpf_cnpj: formData.cpf_cnpj,
        rg: formData.rg,  
        address: formData.address,
        health_plan: formData.health_plan,
        weight: formData.weight,  
        height: formData.height   
      }

      toast.success("Usuário criado com sucesso")
      onClose();
    } catch (err) {
      toast.error("Erro inesperado. Tente novamente")
    }
  };

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

        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Nome Completo"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Data de Nascimento"
              type="date"
              name="birthday"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.birthday}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, birthday: e.target.value }));
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <FormControl>
              <InputLabel>Sexo</InputLabel>
              <Select
                sx={{ minWidth: 260 }}
                value={formData.gender}
                onChange={handleSelectChange}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="isPregnant"
                  checked={formData.isPregnant}
                  onChange={handleChange}
                  disabled={formData.gender === "Masculino"}
                />
              }
              label="Gestante"
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="E-mail"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="WhatsApp"
              name="whatsapp"
              fullWidth
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Local de Atendimento"
              name="place_of_service"
              fullWidth
              value={formData.place_of_service}
              onChange={handleChange}
            />
            <TextField
              label="Ocupação"
              name="occupation"
              fullWidth
              value={formData.occupation}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="CPF"
              name="cpf_cnpj"
              fullWidth
              value={formData.cpf_cnpj}
              onChange={handleChange}
            />
            <TextField
              label="RG"
              name="rg"
              fullWidth
              value={formData.rg}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Endereço"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Plano de Saúde / N°"
              name="health_plan"
              fullWidth
              value={formData.health_plan}
              onChange={handleChange}
            />
            <TextField
              label="Peso (kg)"
              name="weight"
              fullWidth
              value={formData.weight}
              onChange={handleChange}
            />
            <TextField
              label="Altura (m)"
              name="height"
              fullWidth
              value={formData.height}
              onChange={handleChange}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PatientRegistrationModal;
