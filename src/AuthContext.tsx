import React, { createContext, useEffect, useState, useCallback } from "react"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import axios from "axios"

type BackendUserData = {
  id: string
  username: string
  speciality: string
  email: string
  password: string
  cpf_cnpj: string
  register: string
  phone: string
  uf: string
  type: string
  gender: string
  person_id: string
}

type AuthContextProps = {
  firebaseUser: User | null
  backendUser: BackendUserData | null
  loading: boolean
  refreshUser: () => Promise<void> 
}

export const AuthContext = createContext<AuthContextProps>({
  firebaseUser: null,
  backendUser: null,
  loading: true,
  refreshUser: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [backendUser, setBackendUser] = useState<BackendUserData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBackendUser = useCallback(async (user: User) => {
    try {
      const token = await user.getIdToken(true)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBackendUser(response.data)
    } catch (err) {
      console.error("Erro ao buscar dados do usuário no back-end:", err)
      setBackendUser(null)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      await user.getIdToken(true)
      await fetchBackendUser(user)
    }
  }, [fetchBackendUser])

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true)

      if (!user) {
        setFirebaseUser(null)
        setBackendUser(null)
        setLoading(false)
        return
      }

      setFirebaseUser(user)
      await fetchBackendUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [fetchBackendUser])

  return (
    <AuthContext.Provider value={{ firebaseUser, backendUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
