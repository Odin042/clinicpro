import { useState } from "react"
import { auth } from "../../../config/firebasedatabase"

interface Appointments {
  patient_id: number
  type: string
  status: string
  place_of_service: string
  service: string
  start_time: string
  end_time: string
  timezone: string
  description: string
}

interface UseCreateAppointments {
  createAppointments: (patientData: Appointments) => Promise<any>
  loading: boolean
  error: string | null
}

export const useCreateAppointments = (): UseCreateAppointments => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createAppointments = async (appointmentsData: Appointments) => {
    setLoading(true)
    setError(null)

    try {
     
      const user = auth.currentUser
      if (!user) {
        throw new Error("Nenhum usuário autenticado.")
      }

     
      const token = await user.getIdToken()

      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentsData),
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

  return { createAppointments, loading, error }
}
