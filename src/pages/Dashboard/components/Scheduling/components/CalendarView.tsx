// CalendarView.tsx
import React, { useEffect, useRef } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"
import { CalendarApi, EventApi, EventMouseEnterArg, EventMouseLeaveArg } from "@fullcalendar/core"
import { Box, Popover, Typography } from "@mui/material"
import { Dayjs } from "dayjs"

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

export default function CalendarView({ events, onDateClick, selectedDate }: CalendarViewProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [hoveredEvent, setHoveredEvent] = React.useState<EventApi | null>(null)

  const calendarRef = useRef<FullCalendar>(null)

  function handleDateClick(info: any) {
    const calendarApi = calendarRef.current?.getApi?.()
    if (!calendarApi) return
  
    if (calendarApi.view.type === "dayGridMonth") {
      calendarApi.changeView("timeGridDay", info.date)
    } 
    else {
      const d = new Date(info.date)
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
      onDateClick(d)
    }
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
    const calendarObj: CalendarApi | undefined = calendarRef.current?.getApi?.()
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
        dateClick={handleDateClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        titleFormat={{ month: "long", year: "numeric" }}
        dayHeaderFormat={{ weekday: "long" }}
        dayHeaderClassNames={() => "capitalize"}
        eventContent={(arg) => (
          <div
            style={{
              backgroundColor: arg.event.backgroundColor,
              color: arg.event.textColor ?? "#fff",
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
          setHoveredEvent(null)
        }}
        disablePortal
        disableRestoreFocus
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: { mt: 2, pointerEvents: "none" },
          },
        }}
      >
        {hoveredEvent && (
          <Box p={2} sx={{ maxWidth: 300 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {hoveredEvent.title}
            </Typography>
            {hoveredEvent.start && (
              <Typography variant="body2">
                <strong>Início: </strong>
                {new Date(hoveredEvent.start).toLocaleString("pt-BR")}
              </Typography>
            )}
            {hoveredEvent.end && (
              <Typography variant="body2">
                <strong>Fim: </strong>
                {new Date(hoveredEvent.end).toLocaleString("pt-BR")}
              </Typography>
            )}
            {hoveredEvent.extendedProps && (
              <>
                <Typography variant="body2">
                  <strong>Local: </strong>
                  {hoveredEvent.extendedProps.place_of_service || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Serviço: </strong>
                  {hoveredEvent.extendedProps.service || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Status: </strong>
                  {hoveredEvent.extendedProps.status || "N/A"}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Popover>
    </Box>
  )
}
