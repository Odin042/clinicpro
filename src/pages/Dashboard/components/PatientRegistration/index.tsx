import React, { useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Button, Stack, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import PatientRegistrationModal from "./components/PatientResgistrationModal"

interface Patient {
  id: number
  nomeCompleto: string
  dataNascimento: string
  sexo: string
  gestante: string
  email: string
  localAtendimento: string
  whatsApp: string
  ocupacao: string
  cpf: string
  rg: string
  endereco: string
  planoSaude: string
  peso: string
  altura: string
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "nomeCompleto", headerName: "Nome Completo", width: 200 },
  { field: "dataNascimento", headerName: "Data Nascimento", width: 150, hideable: true },
  { field: "sexo", headerName: "Sexo", width: 120 },
  { field: "gestante", headerName: "Gestante", width: 120, hideable: true },
  { field: "email", headerName: "E-mail", width: 200, hideable: true },
  { field: "localAtendimento", headerName: "Local de Atendimento", width: 180 },
  { field: "whatsApp", headerName: "WhatsApp", width: 150, hideable: true },
  { field: "ocupacao", headerName: "Ocupação", width: 150, hideable: true },
  { field: "cpf", headerName: "CPF", width: 150, hideable: true },
  { field: "rg", headerName: "RG", width: 120, hideable: true },
  { field: "endereco", headerName: "Endereço", width: 250, hideable: true },
  { field: "planoSaude", headerName: "Plano de Saúde / N°", width: 180, hideable: true },
  { field: "peso", headerName: "Peso (kg)", width: 120, hideable: true },
  { field: "altura", headerName: "Altura (m)", width: 120, hideable: true }
]

const generateFakeData = (): Patient[] => {
  const data: Patient[] = []
  for (let i = 1; i <= 50; i++) {
    data.push({
      id: i,
      nomeCompleto: `Paciente ${i}`,
      dataNascimento: `19${Math.floor(Math.random() * 99) + 1}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      sexo: ["Masc", "Fem", "Outro"][Math.floor(Math.random() * 3)],
      gestante: ["Sim", "Não"][Math.floor(Math.random() * 2)],
      email: `paciente${i}@example.com`,
      localAtendimento: ["Clínica A", "Clínica B", "Clínica C"][Math.floor(Math.random() * 3)],
      whatsApp: `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      ocupacao: ["Médico", "Engenheiro", "Professor", "Estudante"][Math.floor(Math.random() * 4)],
      cpf: `${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 900) + 100}.${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}`,
      rg: `${Math.floor(Math.random() * 9000000) + 1000000}`,
      endereco: `Rua ${i}, Nº ${Math.floor(Math.random() * 100)}, Bairro ${Math.floor(Math.random() * 10) + 1}`,
      planoSaude: `Plano ${Math.floor(Math.random() * 10) + 1} / Nº ${Math.floor(Math.random() * 10000) + 1000}`,
      peso: `${Math.floor(Math.random() * 100) + 50}`,
      altura: `${1 + Math.floor(Math.random() * 50) / 100}`
    })
  }
  return data
}

const rows: Patient[] = generateFakeData()

const PatientRegistration: React.FC = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Stack spacing={3} sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Pacientes
      </Typography>

      <Stack direction="row" spacing={2} sx={{ marginBottom: "20px", flexWrap: "wrap" }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Adicionar Paciente
        </Button>
      </Stack>

      <Stack sx={{ height: 600, width: "100%", overflowX: isMobile ? "auto" : "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns.map(col => ({
            ...col,
            hide: isMobile && col.hideable ? true : col.hide
          }))}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Stack>

      <PatientRegistrationModal open={open} onClose={handleClose} />
    </Stack>
  )
}

export default PatientRegistration
