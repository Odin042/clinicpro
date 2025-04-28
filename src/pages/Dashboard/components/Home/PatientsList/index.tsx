import React, { useMemo, useState } from "react"
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
} from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/pt-br"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import usePatients from "../../../../../hooks/useGetPatients"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import PatientRegistrationModal from "../components/PatientResgistrationModal"
import { useNavigate } from 'react-router-dom'

type Patient = {
  id: number
  name: string
  email?: string
  status: "ATIVO" | "INATIVO"
  startedAt: string
}

export default function PatientsPage() {
  const { data: patients = [], isPending, isFetching } = usePatients()
  const navigate = useNavigate()
  const [order, setOrder] = useState<"name" | "startedAt">("name")
  const [place, setPlace] = useState("")
  const [name, setName] = useState("")
  const [tags, setTags] = useState("")
  const [start, setStart] = useState<Dayjs | null>(null)
  const [end, setEnd] = useState<Dayjs | null>(null)
  const [openPatientModal, setOpenPatientModal] = useState(false)
  const [page, setPage] = useState(1)
  const perPage = 8

  const loading = isPending || isFetching

  const filtered = useMemo(() => {
    let data = [...patients]
    if (name)
      data = data.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      )
    if (tags)
      data = data.filter((p) =>
        p.email?.toLowerCase().includes(tags.toLowerCase())
      )
    if (start)
      data = data.filter((p) =>
        dayjs(p.startedAt).isAfter(start.subtract(1, "day"))
      )
    if (end)
      data = data.filter((p) => dayjs(p.startedAt).isBefore(end.add(1, "day")))
    if (order === "name") data.sort((a, b) => a.name.localeCompare(b.name))
    if (order === "startedAt")
      data.sort((a, b) => (dayjs(a.startedAt).isAfter(b.startedAt) ? 1 : -1))
    return data
  }, [patients, order, name, tags, start, end])

  const paginated = useMemo(() => {
    const startIdx = (page - 1) * perPage
    return filtered.slice(startIdx, startIdx + perPage)
  }, [filtered, page])

  React.useEffect(() => {
    setPage(1)
  }, [filtered])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Stack spacing={3} px={{ xs: 2, md: 6 }} width="100%">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" fontWeight={700}>
            Pacientes
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenPatientModal(true)}
            sx={{ borderRadius: 2 }}
          >
            Adicionar paciente
          </Button>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={order}
                label="ordenar por"
                onChange={(e) => setOrder(e.target.value as any)}
              >
                <MenuItem value="name">Nome</MenuItem>
                <MenuItem value="startedAt">Data de cadastro</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
              <InputLabel>Local de atendimento</InputLabel>
              <Select
                value={place}
                label="Local de atendimento"
                onChange={(e) => setPlace(e.target.value as string)}
              >
                <MenuItem value="">todos</MenuItem>
                <MenuItem value="CLINICA">clínica</MenuItem>
                <MenuItem value="DOMICILIO">domicílio</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 160 }}
            />

            <Button variant="contained" sx={{ borderRadius: 2 }}>
              Buscar
            </Button>
          </Stack>

          <Stack direction="row" spacing={2}>
            <DatePicker
              label="período de"
              value={start}
              onChange={setStart}
              format="DD/MM/YYYY"
            />
            <DatePicker
              label="período até"
              value={end}
              onChange={setEnd}
              format="DD/MM/YYYY"
            />
          </Stack>
        </Stack>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 320,
            }}
          >
            <DotLottieReact
              src="https://lottie.host/a3d265c3-4bd3-41dc-ab3d-9514aa495a98/kln3ItMPLZ.lottie"
              loop
              autoplay
              style={{ width: 400, height: 300 }}
            />
          </Box>
        ) : (
          <Stack spacing={2}>
            {paginated.map((p) => (
              <Box
                key={p.id}
                onClick={() => navigate(`/dashboard/patient/${p.id}`)}
                bgcolor="#fff"
                borderRadius={8}
                boxShadow={1}
                p={2}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: "#9e9e9e" }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </Avatar>

                  <Box flexGrow={1}>
                    <Typography fontWeight={600}>{p.name}</Typography>
                    {p.email && (
                      <Typography variant="caption" color="text.secondary">
                        {p.email}
                      </Typography>
                    )}
                  </Box>

                  <Stack alignItems="flex-end" mr={1}>
                    <Typography variant="caption" color="text.secondary">
                      paciente desde
                    </Typography>
                    <Typography variant="caption">
                      {dayjs(p.startedAt).format("DD/MM/YYYY")}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <IconButton>
                      <EmailOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <ChatBubbleOutlineIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}

        <Pagination
          count={Math.ceil(filtered.length / perPage)}
          page={page}
          onChange={(_, v) => setPage(v)}
          sx={{ alignSelf: "center", mt: 2 }}
        />

        <PatientRegistrationModal
          open={openPatientModal}
          onClose={() => setOpenPatientModal(false)}
        />
      </Stack>
    </LocalizationProvider>
  )
}
