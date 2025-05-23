import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnamnesis, AnamnesisPayload } from '../services/anamnesis/anamnesis'

export function useCreateAnamnesis (patientId: string | number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: AnamnesisPayload) => createAnamnesis(patientId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['anamnesis', patientId] })
  })
}