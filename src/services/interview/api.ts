import { instanceTwo } from "@/axiosInstance";
import { interviewData } from "@/types/interview";

export const createInterview = (data: interviewData) => {
  return instanceTwo.post("/createinterview", data);
};
