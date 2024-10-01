import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useStudentProfile } from "@/services/user/queries";
import { Loading } from "@/components/custom/Loading";

export default function PrivateRoutes({ children }: { children: ReactNode }) {
  const { data, isPending } = useStudentProfile();
  const authToken = localStorage.getItem("auth-token");
  console.log(data);

  if (authToken != null) {
    if(isPending){
      return <Loading/>;
    }else{
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
