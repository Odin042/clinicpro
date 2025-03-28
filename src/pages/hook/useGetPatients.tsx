import { useState, useEffect } from "react"
import axios from "axios"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export function useGetPatients() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const fetchPatients = async (token: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/patient/list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setPatients(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const token = await user.getIdToken()
        fetchPatients(token)
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { patients, loading, error, setPatients, fetchPatients }
}

export default useGetPatients
