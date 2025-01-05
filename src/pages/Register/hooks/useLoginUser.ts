import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      toast.success("Login realizado com sucesso!")
      const token = response.data.token


      localStorage.setItem("token", token)

      return response.data
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erro ao realizar login."
      toast.error(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}

export default useLoginUser
