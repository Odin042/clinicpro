import { useQuery } from '@tanstack/react-query'
import { listAnamnesis } from '../services/anamnesis/anamnesis'

export function useGetAnamnesis (patientId: string | number) {
  return useQuery({
    queryKey: ['anamnesis', patientId],
    queryFn: () => listAnamnesis(patientId),
    enabled: !!patientId,
    staleTime: 60_000,
    refetchOnWindowFocus: false
  })
}