import React, { createContext, useEffect, useState } from "react"
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
}

export const AuthContext = createContext<AuthContextProps>({
  firebaseUser: null,
  backendUser: null,
  loading: true,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [backendUser, setBackendUser] = useState<BackendUserData | null>(null)
  const [loading, setLoading] = useState(true)

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

      try {

        const token = await user.getIdToken(true)
        const response = await axios.get(
          (`${import.meta.env.VITE_API_URL}/user`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        
        setBackendUser(response.data)
      } catch (err) {
        console.error("Erro ao buscar dados do usuário no back-end:", err)
        setBackendUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])



  return (
    <AuthContext.Provider value={{ firebaseUser, backendUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
