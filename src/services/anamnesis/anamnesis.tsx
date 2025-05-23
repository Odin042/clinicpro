import axios from 'axios'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

async function authHeader () {
  const user = getAuth().currentUser
  if (!user) throw new Error('usuário não autenticado')
  const token = await user.getIdToken()
  return { Authorization: `Bearer ${token}` }
}

export async function listAnamnesis (patientId: string | number) {
  const headers = await authHeader()
  const { data } = await api.get(`/patient/${patientId}/anamnesis`, { headers })
  return data
}

export type AnamnesisPayload = {
  specialty: string
  content: Record<string, any>
}

export async function createAnamnesis (patientId: string | number, payload: AnamnesisPayload) {
  const headers = await authHeader()
  const { data } = await api.post(`/patient/${patientId}/anamnesis`, payload, { headers })
  return data
}