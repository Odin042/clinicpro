import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

interface UserData {
  username: string;
  email: string;
  confirmPassword: string;
  password: string;
  speciality: string;
  cpf_cnpj: string;
  register: string;
  phone: string;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false)

  const createUser = async (data) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/users", {
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
      console.log("Resposta da API:", result)
      return result
    } catch (error) {
      console.error("Erro na chamada da API:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createUser, loading }
}

export default useCreateUser;
