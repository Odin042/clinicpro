import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Typography, Avatar, Paper, Skeleton } from '@mui/material'
import dayjs from 'dayjs'
import usePatient from '../../../../../../hooks/useGetPatientId'

export const PatientDetails = () => {
  const { id } = useParams()           
  const { data: patient, isLoading } = usePatient(id!)

  if (isLoading)
    return <Skeleton variant='rectangular' height={400} sx={{ borderRadius: 2, m: 4 }} />

  if (!patient) return null

  return (
    <Stack spacing={3} px={{ xs: 2, md: 6 }} py={3} width='100%'>
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar sx={{ bgcolor: '#9e9e9e', width: 64, height: 64 }}>
          {patient.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
        </Avatar>
        <Typography variant='h4' fontWeight={700}>
          {patient.name}
        </Typography>
      </Stack>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant='h6' gutterBottom fontWeight={700}>
          Perfil
        </Typography>

        <Typography variant='body2' gutterBottom>
          Ativo
        </Typography>
        <Typography variant='body2'>
          Nascido em {dayjs(patient.birthday).format('DD/MM/YYYY')}
        </Typography>
        <Typography variant='body2'>{patient.email}</Typography>
        <Typography variant='body2'>{patient.whatsapp}</Typography>
      </Paper>
    </Stack>
  )
}

export default PatientDetails
