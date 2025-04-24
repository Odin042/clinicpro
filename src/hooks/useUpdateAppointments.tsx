import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../services/appointments/appointments";

export function useUpdateAppointments() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      updateAppointment(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export default useUpdateAppointments;
