import { useQuery } from '@tanstack/react-query'
import { listRecords } from '../services/medicalRecord/medialRecord'

export default function useRecords(patientId: string | number) {
  return useQuery({
    queryKey: ['records', patientId],
    queryFn: () => listRecords(patientId),
    enabled: !!patientId
  })
}
