import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAppointment } from '../../../services/appointments/appointments'

export function useCreateAppointments() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] })
  })
}

export default useCreateAppointments