import axios from "axios";
import { getAuth } from "firebase/auth";

export async function useGetUsers() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Usuário não está logado no Firebase.");
  }

  const token = await currentUser.getIdToken();

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export default useGetUsers;