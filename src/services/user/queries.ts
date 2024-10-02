import { useQuery } from "@tanstack/react-query";
import { getStudentProfile } from "./api";

export function useStudentProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getStudentProfile(),
    staleTime: 30000,
  });
}
