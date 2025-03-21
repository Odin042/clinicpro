import { useState } from "react"
import { auth } from "../../../config/firebasedatabase"

interface Patient {
  name: string
  birthday: string
  gender: string
  email: string
  whatsapp: string
  place_of_service: string
  occupation: string
  cpf_cnpj: string
  rg: string
  address: string
  health_plan: string
  weight: string
  height: string
}

interface UseCreatePatientReturn {
  createPatient: (patientData: Patient) => Promise<any>
  loading: boolean
  error: string | null
}

export const useCreatePatient = (): UseCreatePatientReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPatient = async (patientData: Patient) => {
    setLoading(true)
    setError(null)

    try {
     
      const user = auth.currentUser
      if (!user) {
        throw new Error("Nenhum usuário autenticado.")
      }

     
      const token = await user.getIdToken()

      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/patient`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(patientData),
        }
      )

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`)
      }

      const result = await response.json()
      return result
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro ao criar o paciente.")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createPatient, loading, error }
}
