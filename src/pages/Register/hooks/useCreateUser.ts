import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface UserData {
  username: string
  email: string
  confirmPassword: string
  password: string
  speciality: string
  cpf_cnpj: string
  register: string
  uf: string
  phone: string
}

export const useCreateUser = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<UserData>()

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
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
      toast.success("Usuário criado com sucesso!")
      console.log("Resposta da API:", result)
      return result
    } catch (error) {
      console.error("Erro na chamada da API:", error)
      toast.error("Erro ao criar usuário. Tente novamente.")
      throw error
    }
  }

  return { onSubmit: handleSubmit(onSubmit), register, errors }
}

export default useCreateUser
