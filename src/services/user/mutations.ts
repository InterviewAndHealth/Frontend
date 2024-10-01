import {
  registerData,
  studentProfileData,
  updateStudentProfileData,
} from "@/types/user";
import {
  createStudentProfile,
  login,
  register,
  updateStudentProfile,
  uploadResume,
} from "./api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Notify from "@/lib/notify";

export function useRegister() {
  return useMutation({
    mutationFn: (data: registerData) => register(data),
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
        localStorage.setItem("auth-token", response?.data?.authToken);
        Notify("success", response?.data?.message);
        window.location.href = "/dashboard/overview";
      }
    },
    onSettled: () => {
      console.log("on setteled");
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: registerData) => login(data),
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
        localStorage.setItem("auth-token", response?.data?.authToken);
        Notify("success", response?.data?.message);
        window.location.href = "/dashboard/overview";
      }
    },
    onSettled: () => {
      console.log("on setteled");
    },
  });
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: (data: { student: studentProfileData; file: File }) =>
      createStudentProfile(data.student, data.file),
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
        Notify("success", response?.data?.message);
        window.location.href = "/dashboard/overview";
      }
    },
    onSettled: () => {
      console.log("on setteled");
    },
  });
}

export function useUpdateStudent() {
  return useMutation({
    mutationFn: (data: updateStudentProfileData) => updateStudentProfile(data),
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
        Notify("success", response?.data?.message);
      }
    },
    onSettled: () => {
      console.log("on setteled");
    },
  });
}

export function useUploadResume() {
  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
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
        Notify("success", response?.data?.message);
      }
    },
    onSettled: () => {
      console.log("on setteled");
    },
  });
}
