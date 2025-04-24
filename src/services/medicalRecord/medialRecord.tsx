import axios from 'axios'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

async function authHeader() {
  const user = getAuth().currentUser
  if (!user) throw new Error('usuário não autenticado')
  const token = await user.getIdToken()
  return { Authorization: `Bearer ${token}` }
}


export async function listRecords(patientId: string | number) {
  const headers = await authHeader()
  const { data } = await api.get(`/patient/${patientId}/records`, { headers })
  return data                      
}

export async function createRecord(
  patientId: string | number,
  payload: { note_type?: string; content: string; attachments?: any }
) {
  const headers = await authHeader()
  const { data } = await api.post(`/patient/${patientId}/records`, payload, { headers })
  return data                      
}
