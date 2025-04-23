import React, { useMemo, useState } from 'react'
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
  Skeleton
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import usePatients from '../../../../hook/useGetPatients'

type Patient = {
  id: number
  name: string
  email?: string
  status: 'ATIVO' | 'INATIVO'
  startedAt: string
}

export default function PatientsPage({
  onAddPatient,
  onMail,
  onMessage,
  onDetails,
  onExport,
  onBroadcast
}: {
  onAddPatient: () => void
  onMail: (p: Patient) => void
  onMessage: (p: Patient) => void
  onDetails: (p: Patient) => void
  onExport: () => void
  onBroadcast: () => void
}) {
  const { data: patients = [], isPending, isFetching } = usePatients()

  const [order, setOrder] = useState<'name' | 'startedAt'>('name')
  const [place, setPlace] = useState('')
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')
  const [start, setStart] = useState<Dayjs | null>(null)
  const [end, setEnd] = useState<Dayjs | null>(null)

  const loading = isPending || isFetching

  const filtered = useMemo(() => {
    let data = [...patients]
    if (name) data = data.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
    if (tags) data = data.filter(p => p.email?.toLowerCase().includes(tags.toLowerCase()))
    if (start) data = data.filter(p => dayjs(p.startedAt).isAfter(start.subtract(1, 'day')))
    if (end) data = data.filter(p => dayjs(p.startedAt).isBefore(end.add(1, 'day')))
    if (order === 'name') data.sort((a, b) => a.name.localeCompare(b.name))
    if (order === 'startedAt') data.sort((a, b) => dayjs(a.startedAt).isAfter(b.startedAt) ? 1 : -1)
    return data
  }, [patients, order, name, tags, start, end])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <Stack spacing={3} px={{ xs: 2, md: 6 }} width='100%'>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' fontWeight={700}>
            Pacientes
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button variant='contained' onClick={onAddPatient}>
              Adicionar paciente
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Stack direction='row' spacing={2} flexWrap='wrap'>
            <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
              <InputLabel>Ordenar por</InputLabel>
              <Select value={order} label='ordenar por' onChange={e => setOrder(e.target.value as any)}>
                <MenuItem value='name'>Nome</MenuItem>
                <MenuItem value='startedAt'>Data de cadastro</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160, flexGrow: 1 }}>
              <InputLabel>Local de atendimento</InputLabel>
              <Select value={place} label='Local de atendimento' onChange={e => setPlace(e.target.value as string)}>
                <MenuItem value=''>todos</MenuItem>
                <MenuItem value='CLINICA'>clínica</MenuItem>
                <MenuItem value='DOMICILIO'>domicílio</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label='Nome'
              value={name}
              onChange={e => setName(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 160 }}
            />

            <Button variant='contained'>
              buscar
            </Button>
          </Stack>

          <Stack direction='row' spacing={2}>
            <DatePicker
              label='período de'
              value={start}
              onChange={setStart}
              format='DD/MM/YYYY'
            />
            <DatePicker
              label='período até'
              value={end}
              onChange={setEnd}
              format='DD/MM/YYYY'
            />
          </Stack>
        </Stack>

        {loading && (
          <Stack spacing={2}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant='rectangular' height={70} sx={{ borderRadius: 1 }} />
            ))}
          </Stack>
        )}

        {!loading && (
          <Stack spacing={2}>
            {filtered.map(p => (
              <Box
                key={p.id}
                bgcolor='#fff'
                borderRadius={1}
                boxShadow={1}
                p={2}
              >
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar sx={{ bgcolor: '#9e9e9e' }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </Avatar>

                  <Box flexGrow={1}>
                    <Typography fontWeight={600}>{p.name}</Typography>
                    {p.email && (
                      <Typography variant='caption' color='text.secondary'>
                        {p.email}
                      </Typography>
                    )}
                  </Box>

                  <Stack alignItems='flex-end' mr={1}>
                    <Typography variant='caption' color='text.secondary'>
                      paciente desde
                    </Typography>
                    <Typography variant='caption'>
                      {dayjs(p.startedAt).format('DD/MM/YYYY')}
                    </Typography>
                  </Stack>

                  <Stack direction='row' spacing={1}>
                    <IconButton onClick={() => onMail(p)}>
                      <EmailOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton onClick={() => onMessage(p)}>
                      <ChatBubbleOutlineIcon fontSize='small' />
                    </IconButton>
                    <IconButton onClick={() => onDetails(p)}>
                      <PersonOutlineOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton>
                      <MoreVertIcon fontSize='small' />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </LocalizationProvider>
  )
}
