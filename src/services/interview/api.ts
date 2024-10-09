import { interview_schedule_backend } from "@/axiosInstance";
import { interviewData } from "@/types/interview";

export const createInterview = (data: interviewData) => {
  return interview_schedule_backend.post("/createinterview", data);
};
