import { z } from "zod"


export const registerFormSchema = z
  .object({
    speciality: z.string().min(1, "Especialidade é obrigatória."),
    username: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Digite um e-mail válido."),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })
