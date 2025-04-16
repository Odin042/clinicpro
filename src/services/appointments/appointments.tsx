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


export async function listAppointments() {
  const headers = await authHeader()
  const { data } = await api.get('/appointments/list', { headers })
  return data                       
}


export async function createAppointment(payload: any) {
  const headers = await authHeader()
  const { data } = await api.post('/appointments', payload, { headers })
  return data                       
}


export async function updateAppointment(id: string | number, payload: any) {
  const headers = await authHeader()
  const { data } = await api.put(`/appointments/${id}`, payload, { headers })
  return data.appointment           
}


export async function deleteAppointment(id: string | number) {
  const headers = await authHeader()
  await api.delete(`/appointments/${id}`, { headers })
}
