import { z } from "zod"

const isValidCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "")

  if (digits.length === 11) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)
  } else if (digits.length === 14) {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value)
  }
  return false
}


export const registerFormSchema = z
  .object({
    speciality: z.string().min(1, "Especialidade obrigatória."),
    username: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Email inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string(),
    phone: z.string().min(1, "Telefone obrigatório."),
    uf: z.string(),
    gender: z.string(),
    cpf_cnpj: z.string().refine(isValidCpfCnpj, {
      message: "CPF ou CNPJ inválido.",
    }),
    register: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })
