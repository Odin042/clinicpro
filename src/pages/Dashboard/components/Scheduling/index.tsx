import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import useGetAppointments from '../../../../hooks/useGetAppointments'
import useGetPatient from '../../../../hooks/useGetPatients'
import SideMenu from './components/SideMenu'
import CalendarView from './components/CalendarView'
import AppointmentModal from '../Home/components/AppointmentsModal'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function getStatusColor(s: string) {
  const map: Record<string, string> = {
    PENDING: '#FFC107',
    CONFIRMED: '#4CAF50',
    CANCELED: '#F44336'
  }
  return map[s] || '#f90000'
}

interface StatusFilters {
  PENDING: boolean
  CONFIRMED: boolean
  CANCELED: boolean
}

export default function CalendarAppointments() {
  const { data: appointments = [], isLoading: loadingAppointments } = useGetAppointments()
  const { data: patients = [], isLoading: loadingPatients } = useGetPatient()
  const loading = loadingAppointments || loadingPatients

  const [miniDate, setMiniDate] = useState<Dayjs>(dayjs())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [statusFilters, setStatusFilters] = useState<StatusFilters>({
    PENDING: true,
    CONFIRMED: true,
    CANCELED: true
  })

  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    if (!loading && appointments.length && patients.length) {
      const filtered = appointments
        .filter(ap => statusFilters[ap.status])
        .map(ap => {
          const patient = patients.find(p => p.id === ap.patient_id)
          return {
            id: ap.id,
            title: patient ? patient.name : 'Paciente não encontrado',
            start: ap.start_time,
            end: ap.end_time,
            backgroundColor: getStatusColor(ap.status),
            textColor: '#fff',
            display: 'block',
            extendedProps: {
              place_of_service: ap.place_of_service,
              service: ap.service,
              status: ap.status,
              online_service: ap.online_service
            }
          }
        })
      setEvents(filtered)
    }
  }, [loading, appointments, patients, statusFilters])

  function handleStatusChange(key: keyof StatusFilters) {
    setStatusFilters(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleDateChange(newDate: Dayjs) {
    setMiniDate(newDate)
  }

  function handleCreateAppointment() {
    setIsModalOpen(true)
  }

  function handleCalendarDateClick(date: Date) {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <Box
        width='100%'
        height='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <DotLottieReact
          src='https://lottie.host/441ebd51-6c79-4589-a2ee-7ef175c34fcc/TAauAoKaZ4.lottie'
          loop
          autoplay
          style={{ width: 300, height: 300 }}
        />
      </Box>
    )
  }
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <Stack direction='row' sx={{ width: '100%', height: '100%' }}>
        <SideMenu
          statusFilters={statusFilters}
          onStatusChange={handleStatusChange}
          selectedDate={miniDate}
          onDateChange={handleDateChange}
          onCreateAppointment={handleCreateAppointment}
        />
        <CalendarView
          events={events}
          onDateClick={handleCalendarDateClick}
          selectedDate={miniDate}
        />
      </Stack>

      <AppointmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </LocalizationProvider>
  )
}
