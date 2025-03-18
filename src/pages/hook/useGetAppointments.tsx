// useGetPatients.ts
import { useState, useEffect } from "react"
import axios from "axios"
import { getAuth } from "firebase/auth"

export  function useGetPatients() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const auth = getAuth()
        const currentUser = auth.currentUser
        if (!currentUser) {
          throw new Error("Usuário não está logado no Firebase.")
        }

        const token = await currentUser.getIdToken()

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/appointments/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setAppointments(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  

  return { appointments, loading, error }

}

export default useGetPatients
