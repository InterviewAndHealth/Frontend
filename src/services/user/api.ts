import {
  googleLoginData,
  registerData,
  studentProfileData,
  updateStudentProfileData,
} from "@/types/user";
import { user_backend } from "@/axiosInstance";

export const register = (data: registerData) => {
  return user_backend.post("/register", data);
};

export const login = (data: registerData) => {
  return user_backend.post("/login", data);
};

export const googleLogin = (data: googleLoginData) => {
  return user_backend.get(`/google?code=${data.code}`);
};

export const getStudentProfile = () => {
  return user_backend.get("/StudentProfile");
};

export const createStudentProfile = (data: studentProfileData, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("contactNumber", data.contactNumber);
  formData.append("gender", data.gender);
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append("preparingFor", data.preparingFor);
  formData.append("workMode", data.workMode);
  formData.append("preferredCity", data.preferredCity);
  data.skills?.map((skill) => formData.append("skills", skill));
  return user_backend.post("/studentprofilewithresume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateStudentProfile = (data: updateStudentProfileData) => {
  return user_backend.put("/StudentProfile", data);
};

export const uploadResume = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return user_backend.post("/uploadResume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
