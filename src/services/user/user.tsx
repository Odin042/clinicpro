import axios from 'axios'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export async function registerUser(
  email: string,
  password: string,
  additional: Record<string, any>
) {

  const { user } = await createUserWithEmailAndPassword(getAuth(), email, password)

 
  await user.getIdToken(true)

  
  const { data } = await api.post('/register', {
    email,
    password,
    ...additional
  })

  return data                               
}


export async function listUsers() {
  const user = getAuth().currentUser
  if (!user) throw new Error('usuário não autenticado')

  const token = await user.getIdToken()
  const { data } = await api.get('/user', {
    headers: { Authorization: `Bearer ${token}` }
  })

  return data                               
}