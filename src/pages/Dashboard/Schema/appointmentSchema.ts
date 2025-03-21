import { z } from "zod";

export const appointmentSchema = z.object({
  type: z.string().nonempty(),
  situation: z.string().nonempty(),
  patientId: z
  .coerce
  .number()
  .min(1, "Selecione um paciente."),
  placeOfService: z.string().nonempty(),
  service: z.string().nonempty(),
  startDate: z.string().nonempty(),
  endDate: z.string(),
  timeZone: z.string().nonempty(),
  description: z.string()
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
