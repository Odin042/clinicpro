import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().nonempty("Nome obrigatório"),
  birthday: z.string().nonempty("Data de nascimento obrigatória"),
  gender: z.enum(["Masculino", "Feminino"]).optional(),
  isPregnant: z.boolean().optional(),
  email: z.string().email("Formato de e-mail inválido"),
  whatsapp: z.string().nonempty("Telefone obrigatório"),
  place_of_service: z.string().optional(),
  occupation: z.string().optional(),
  cpf_cnpj: z.string().nonempty("CPF obrigatório"),
  rg: z.string().optional(),
  address: z.string().nonempty("Endereço obrigatório"),
  health_plan: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
});
