import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useStudentProfile } from "@/services/user/queries";
import { Loading } from "@/components/custom/Loading";
import { jwtDecode } from "jwt-decode";
import Notify from "@/lib/notify";

export default function PrivateRoutes({ children }: { children: ReactNode }) {
  const { data, isPending } = useStudentProfile();
  const authToken = localStorage.getItem("auth-token");

  if (authToken != null) {
    const decodedToken = jwtDecode(authToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken && decodedToken.exp) {
      if (decodedToken.exp < currentTime) {
        Notify("info", "Session expired!!");
        localStorage.removeItem("auth-token");
        return <Navigate to="/login" />;
      }
    }
    if (isPending) {
      return <Loading />;
    } else {
      if (data) {
        return <>{children}</>;
      } else {
        return <Navigate to={"/user-details"} />;
      }
    }
  } else {
    return <Navigate to="/login" />;
  }
}
