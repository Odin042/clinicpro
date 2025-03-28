import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebasedatabase"
import { AuthContext } from "../../../AuthContext"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { refreshUser } = useContext(AuthContext)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user


      await refreshUser()

      return user 

    } catch (err: any) {
      console.error("Erro ao logar:", err.message)
      setError(err.message || "Erro ao realizar o login")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}

export default useLogin
