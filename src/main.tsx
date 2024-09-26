import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
