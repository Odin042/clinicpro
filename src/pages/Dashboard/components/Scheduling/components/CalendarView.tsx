import React, { useEffect, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"
import {
  CalendarApi,
  EventApi,
} from "@fullcalendar/core"
import { Box } from "@mui/material"
import { Dayjs } from "dayjs"
import VideoCallIcon from "@mui/icons-material/VideoCall"
import useUpdateAppointments from "../../../../../hooks/useUpdateAppointments"
import { useQueryClient } from "@tanstack/react-query"

interface CalendarEvent {
  id: number | string
  title: string
  start: string
  end?: string
  backgroundColor?: string
  textColor?: string
  display?: string
  extendedProps?: { [key: string]: any }
}

interface CalendarViewProps {
  events: CalendarEvent[]
  onDateClick: (date: Date) => void
  selectedDate: Dayjs
}

export default function CalendarView({
  events,
  onDateClick,
  selectedDate,
}: CalendarViewProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [hoveredEvent, setHoveredEvent] = React.useState<EventApi | null>(null)
  const qc = useQueryClient()

  const { mutate } = useUpdateAppointments()
  const calendarRef = useRef<FullCalendar>(null)

  function handleDateClick(info: any) {
    const api = calendarRef.current?.getApi?.()
    if (!api) return
  
    if (api.view.type === 'dayGridMonth') {
      api.changeView('timeGridDay', info.date)   
      return
    }
  
    onDateClick(info.date)                      
  }

  function handleEventChange(info: EventDropArg | EventResizeDoneArg) {
    const { event } = info
    const payload = {
      start_time: event.start?.toISOString(),
      end_time: event.end?.toISOString(),
    }

    mutate(
      { id: event.id, data: payload },
      {
        onError: () => {
          info.revert?.()
        },

        onSuccess: (appointment) => {
          qc.setQueryData(["appointments"], (old: any[] = []) =>
            old.map((a) => (a.id === appointment.id ? appointment : a))
          )
        },
      }
    )
  }

  function handleEventMouseEnter(info: EventMouseEnterArg) {
    setAnchorEl(info.el)
    setHoveredEvent(info.event)
  }

  function handleEventMouseLeave(info: EventMouseLeaveArg) {
    setAnchorEl(null)
    setHoveredEvent(null)
  }

  useEffect(() => {
    const calendarObj: CalendarApi | undefined =
      calendarRef.current?.getApi?.()
    if (calendarObj && selectedDate) {
      calendarObj.gotoDate(selectedDate.toDate())
    }
  }, [selectedDate])

  return (
    <Box flex={1} position="relative" overflow="auto">
      <FullCalendar
        ref={calendarRef}
        locales={[ptBrLocale]}
        locale="pt-br"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable
        eventDrop={handleEventChange}
        eventResize={handleEventChange}
        dateClick={handleDateClick}
        height="auto"
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        titleFormat={{ month: "long", year: "numeric" }}
        dayHeaderFormat={{ weekday: "long" }}
        dayHeaderClassNames={() => "capitalize"}
        eventContent={(arg) => {
          const onlineService = arg.event.extendedProps?.online_service

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: arg.event.backgroundColor,
                color: arg.event.textColor ?? "#fff",
                padding: "2px 4px",
                borderRadius: "4px",
                fontSize: "0.75rem",
              }}
            >
              {onlineService && (
                <VideoCallIcon sx={{ fontSize: 20, mr: 0.5 }} />
              )}
              <span>
                {arg.timeText} {arg.event.title}
              </span>
            </Box>
          )
        }}
      />
    </Box>
  )
}
