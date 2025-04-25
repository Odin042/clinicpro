import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Stack,
  Typography,
  Avatar,
  Paper,
  Skeleton,
  Button,
  Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import dayjs from 'dayjs'
import usePatient from '../../../../../../../hooks/useGetPatientId'
import PatientMedicalHubModal from './components/PatientMedicalHubModal/PatientMedicalHubModal'

type Record = { id: string; title: string }

const PatientDetails = () => {
  const { id } = useParams()
  const { data: patient, isLoading } = usePatient(id!)
  const [records] = useState<Record[]>([])
  const [openHub, setOpenHub] = useState(false)

  if (isLoading)
    return <Skeleton variant='rectangular' height={400} sx={{ borderRadius: 2, m: 4 }} />

  if (!patient) return null

  return (
    <>
      <Stack direction='row' spacing={3} px={{ xs: 2, md: 4 }} py={3} width='100%'>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, minWidth: 160 }}>
          <Button
            fullWidth
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setOpenHub(true)}
          >
            Adicionar
          </Button>
        </Paper>

        <Stack spacing={3} flex={1}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction='row' spacing={3} alignItems='center'>
              <Avatar sx={{ bgcolor: '#9e9e9e', width: 72, height: 72 }}>
                {patient.name
                  .split(' ')
                  .map(n => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </Avatar>

              <Stack spacing={0.5}>
                <Typography variant='h5' fontWeight={700}>
                  {patient.name}
                </Typography>
                <Typography variant='body2'>
                  Nascido em {dayjs(patient.birthday).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant='body2'>{patient.email}</Typography>
                <Typography variant='body2'>{patient.whatsapp}</Typography>
              </Stack>

              <Divider flexItem orientation='vertical' sx={{ mx: 3 }} />

              <Stack direction='row' spacing={4}>
                <Info label='Peso' value={patient.weight ? `${patient.weight} kg` : '--'} />
                <Info label='Altura' value={patient.height ? `${patient.height} m` : '--'} />
                <Info label='Sexo' value={patient.gender ?? '--'} />
              </Stack>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant='h6' fontWeight={700} gutterBottom>
              Prontuários ({records.length})
            </Typography>

            <Stack direction='row' spacing={2} flexWrap='wrap'>
              {records.map((rec, idx) => (
                <Button key={rec.id} variant='outlined'>
                  {rec.title || `Prontuário ${idx + 1}`}
                </Button>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Stack>

      <PatientMedicalHubModal open={openHub} onClose={() => setOpenHub(false)} />
    </>
  )
}

const Info = ({ label, value }) => (
  <Stack spacing={0.5}>
    <Typography variant='caption' color='text.secondary'>
      {label}
    </Typography>
    <Typography variant='subtitle1' fontWeight={600}>
      {value}
    </Typography>
  </Stack>
)

export default PatientDetails
