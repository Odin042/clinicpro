import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPatient } from '../services/patients/patients'

export function useCreatePatient() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['patients'] })
  })
}

export default useCreatePatient