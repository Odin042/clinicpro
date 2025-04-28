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

export async function listPatients() {
  const headers = await authHeader()
  const { data } = await api.get('/patient/list', { headers })
  return data                   
}

export async function getPatient(id: string | number) {
  const headers = await authHeader()
  const { data } = await api.get(`/patient/${id}`, { headers })
  return data                      
}

export async function createPatient(payload: any) {
  const headers = await authHeader()
  const { data } = await api.post('/patient', payload, { headers })
  return data                    
}
