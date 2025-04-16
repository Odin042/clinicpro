import { useQuery } from '@tanstack/react-query'
import { listUsers } from '../../services/user/user'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: listUsers,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false
  })
}