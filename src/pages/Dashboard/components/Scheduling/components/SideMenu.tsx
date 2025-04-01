import React from "react"
import {
  Box,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import dayjs, { Dayjs } from "dayjs"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"

interface StatusFilters {
  PENDING: boolean
  CONFIRMED: boolean
  CANCELED: boolean
}

interface SideMenuProps {
  statusFilters: StatusFilters
  onStatusChange: (statusKey: keyof StatusFilters) => void
  selectedDate: Dayjs
  onDateChange: (date: Dayjs) => void
  onCreateAppointment: () => void
}

export default function SideMenu({
  statusFilters,
  onStatusChange,
  selectedDate,
  onDateChange,
  onCreateAppointment,
}: SideMenuProps) {
  return (
    <Box
      width={400}
      p={2}
      borderRight="1px solid #ccc"
      bgcolor="#f9f9f9"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Stack sx={{ margin: "40px 0 40px 0" }}>
        <Button
          startIcon={<EditCalendarIcon />}
          variant="contained"
          onClick={onCreateAppointment}
        >
          Criar agendamento
        </Button>
      </Stack>

      <Stack sx={{ margin: "0 0 40px 0" }}>
        <Typography variant="h6" fontWeight={600}>
          Filtros
        </Typography>

        <FormControlLabel
          label="Pendente"
          control={
            <Checkbox
              checked={statusFilters.PENDING}
              onChange={() => onStatusChange("PENDING")}
            />
          }
        />
        <FormControlLabel
          label="Confirmado"
          control={
            <Checkbox
              checked={statusFilters.CONFIRMED}
              onChange={() => onStatusChange("CONFIRMED")}
            />
          }
        />
        <FormControlLabel
          label="Cancelado"
          control={
            <Checkbox
              checked={statusFilters.CANCELED}
              onChange={() => onStatusChange("CANCELED")}
            />
          }
        />
      </Stack>

      <Divider />

      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={(newValue) => {
          if (newValue) onDateChange(newValue)
        }}
      />
    </Box>
  )
}