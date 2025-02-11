import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  username: string;
  speciality?: string;
  created_at: string;
}

interface UseUserByEmailReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserByEmail = (email: string): UseUserByEmailReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user?email=${email}`
      )      
      if (!response.ok) {
   
        throw new Error(`Erro ${response.status}: ${await response.text()}`);
      }
      const data = await response.json();
      setUser(data)
    } catch (err: any) {
      setError(err.message || "Erro ao buscar usuário");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUser();
  }, [email]);

  return { user, loading, error, refetch: fetchUser };
};

export default useUserByEmail;
