import axios from "axios";

// Function to create an Axios instance with token handling
const createApiInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth-token"); // Get token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // If the response is successful, return the response
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Check if the error message is "Token required"
        if (
          error.response.data.message === "Authentication token is required"
        ) {
          // Remove the token
          localStorage.removeItem("auth-token");

          // Navigate to the home page 
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create instances for each backend
export const instanceOne = createApiInstance(import.meta.env.VITE_BACKEND_URL);
export const instanceTwo = createApiInstance(
  import.meta.env.VITE_INTERVIEW_BACKEND_URL
);
