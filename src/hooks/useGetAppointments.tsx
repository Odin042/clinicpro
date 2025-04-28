import { useQuery } from "@tanstack/react-query";
import { listAppointments } from "../services/appointments/appointments";

export function useGetAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: listAppointments,
    staleTime: 1000 * 60, // 1 min
    refetchOnWindowFocus: false,
  });
}

export default useGetAppointments;
