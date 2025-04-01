import React, { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"
import useGetAppointments from "../../../hook/useGetAppointments"
import useGetPatient from "../../../hook/useGetPatients"
import { Skeleton, Box } from "@mui/material"

export default function CalendarAppointments() {
  const { appointments, loading: loadingAppointments } = useGetAppointments()
  const { patients, loading: loadingPatients } = useGetPatient()
  const [events, setEvents] = useState([])

  const getStatusColor = (status) => {
    const colors = {
      PENDING: "#FFC107",
      CONFIRMED: "#4CAF50",
      CANCELED: "#F44336",
    }
    return colors[status] || "#f90000"
  }

  useEffect(() => {
    if (appointments.length > 0 && patients.length > 0) {
      const mapped = appointments.map((appointment) => {
        const patient = patients.find((p) => p.id === appointment.patient_id)
        return {
          id: appointment.id,
          title: patient ? patient.name : "Paciente não encontrado",
          start: appointment.start_time,
          end: appointment.end_time,
          backgroundColor: getStatusColor(appointment.status),
          borderColor: "#000",
          textColor: "#fff",
          display: "block",
          extendedProps: {
            ...appointment,
            patientName: patient ? patient.name : null,
          },
        }
      })
      setEvents(mapped)
    }
  }, [appointments, patients])

  if (loadingAppointments || loadingPatients) {
    return (
      <Box p={4}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
    )
  }

  return (
    <div className="p-4">
      <FullCalendar
        locales={[ptBrLocale]}
        locale="pt-br"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        titleFormat={{ month: "long", year: "numeric" }}
        dayHeaderFormat={{ weekday: "long" }}
        dayHeaderClassNames={() => "capitalize"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventContent={(arg) => (
          <div
            style={{
              backgroundColor: arg.event.backgroundColor,
              color: "#fff",
              padding: "2px 4px",
              borderRadius: "4px",
              fontSize: "0.75rem",
            }}
          >
            {arg.timeText} {arg.event.title}
          </div>
        )}
        height="auto"
      />
    </div>
  )
}
