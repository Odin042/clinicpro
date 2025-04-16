import { signInWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

export async function signIn(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(getAuth(), email, password)
  return user
}