import { useGoogleLogin, CodeResponse } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useGoogleSignup } from "@/services/user/mutations";
import googleLogo from "@/assets/google.png";

const GoogleLogin = () => {
  const login = useGoogleSignup();

  const responseMessage = (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    console.log(response["code"]);
    const code = response["code"];
    localStorage.setItem("google_auth_code", response["code"]);
    login.mutate({ code });
  };
  const errorMessage = (
    error: Pick<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    console.log(error);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: errorMessage,
    flow: "auth-code",
  });
  return (
    <>
      <Button
        className="flex items-center justify-center w-[60%] py-2 px-3 bg-white text-blue-600 border border-gray-300 rounded-md shadow hover:bg-gray-100 text-sm"
        onClick={googleLogin}
      >
        <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>
    </>
  );
};

export default GoogleLogin;
