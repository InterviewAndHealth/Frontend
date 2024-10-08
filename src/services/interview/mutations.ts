import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Notify from "@/lib/notify";
import { interviewData } from "@/types/interview";
import { createInterview } from "./api";

export function useCreateInterview() {
  return useMutation({
    mutationFn: (data: interviewData) => createInterview(data),
    onMutate: () => {
      console.log("onMutate");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("onError", error?.response);
        Notify("error", error?.response?.data?.message);
      }
    },
    onSuccess: (response) => {
      console.log("onSuccess");
      if (response) {
        localStorage.setItem(
          "interviewid",
          response.data?.interview?.interviewid
        );
        Notify("success", response?.data?.message);
        window.location.href = `/interview/${response.data?.interview?.interviewid}`;
      }
    },
    onSettled: () => {
      console.log("on setteled");
    },
  });
}
