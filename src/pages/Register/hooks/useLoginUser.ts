import { useMutation } from '@tanstack/react-query'
import { signIn } from '../../../services/login/login'
import { useContext } from 'react'
import { AuthContext } from '../../../AuthContext'

export function useLogin() {
  const { refreshUser } = useContext(AuthContext)

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),

    onSuccess: async () => {
      await refreshUser()
    }
  })
}

export default useLogin
