import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebasedatabase"

interface UseCreateUserReturn {
  createUser: (
    email: string,
    password: string,
    additionalData: Record<string, any>
  ) => Promise<any>
  loading: boolean
  error: string | null
}

export const useCreateUser = (): UseCreateUserReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createUser = async (
    email: string,
    password: string,
    additionalData: Record<string, any>
  ) => {
    setLoading(true)
    setError(null)
  
    let user: User | null = null
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user = userCredential.user
  

      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password,
          ...additionalData,
        }),
      })
  
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }
  
      const result = await response.json()
      return result
  
    } catch (error: any) {
      if (user) {
        await user.delete()
      }
      setError(error.message || "Ocorreu um erro")
      throw error
  
    } finally {
      setLoading(false)
    }
  }

  return { createUser, loading, error }
}

export default useCreateUser
