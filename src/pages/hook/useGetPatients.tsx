import { useQuery } from '@tanstack/react-query'
import { listPatients } from '../../services/patients/patients'

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: listPatients,
    staleTime: 1000 * 60,         
    refetchOnWindowFocus: false
  })
}

export default usePatients