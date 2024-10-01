import {
  registerData,
  studentProfileData,
  updateStudentProfileData,
} from "@/types/user";
import axios from "axios";

export const register = (data: registerData) => {
  return axios.post("/register", data);
};

export const login = (data: registerData) => {
  return axios.post("/login", data);
};

export const getStudentProfile = () => {
  return axios.get("/StudentProfile");
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
  return axios.post("/studentprofilewithresume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateStudentProfile = (data: updateStudentProfileData) => {
  return axios.put("/StudentProfile", data);
};

export const uploadResume = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post("/uploadResume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
