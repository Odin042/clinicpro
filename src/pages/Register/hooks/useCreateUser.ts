import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface UserData {
  username: string;
  email: string;
  confirmPassword: string;
  password: string;
  speciality: string;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);

  const createUser = async (userData: UserData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Usuário criado com sucesso!");
      return response.data;
    } catch (err: any) {
      if (err.response) {
        console.error("Erro na resposta da API:", err.response.data)
        console.error("Status:", err.response.status)
        console.error("Headers:", err.response.headers)
      } else if (err.request) {
        console.error("Erro na requisição:", err.request)
        console.error("Erro geral:", err.message)
      }

      const errorMessage =
        err.response?.data?.message || "Erro ao criar usuário.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading };
};

export default useCreateUser;
