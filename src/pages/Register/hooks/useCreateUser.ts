import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const useCreateUser = () => {
  const createUser = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const result = await response.json()
      
      return result
    } catch (error) {
      throw error
    }
  }

  return { createUser }
}

export default useCreateUser