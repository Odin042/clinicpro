import { useQuery } from '@tanstack/react-query'
import { getPatient } from "../services/patients/patients"

export function usePatient(id: string | number) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id),
    enabled: !!id
  })
}

export default usePatient