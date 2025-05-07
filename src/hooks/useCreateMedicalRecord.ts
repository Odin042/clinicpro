import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecord } from '../services/medicalRecord/medialRecord'

type Payload = {
  note_type?: string
  content: string
  attachments?: any
}

export default function useCreateRecord(patientId: string | number) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (payload: Payload) => createRecord(patientId, payload),
    onSuccess: () => qc.invalidateQueries(['records', patientId])
  })
}