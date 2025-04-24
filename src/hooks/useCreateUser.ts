import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUser } from '../services/user/user'

export function useCreateUser() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password, extra }: { email: string; password: string; extra: any }) =>
      registerUser(email, password, extra),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export default useCreateUser