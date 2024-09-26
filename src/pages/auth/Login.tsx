import { NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import GoogleLogin from "@/components/custom/googleLogin";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#dcdcf8] via-[#0f0f60] to-[#01010f]">
      <Card className="w-[450px] h-[500px] p-8 rounded-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-blue-700">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Social Sign In Buttons */}
          <div className="flex justify-center space-x-4 px-4">
            <Button className="flex items-center justify-center w-[60%] py-2 px-3 bg-white text-blue-600 border border-gray-300 rounded-md shadow hover:bg-gray-100 text-sm">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn"
                className="w-4 h-4 mr-1"
              />
              Continue with LinkedIn
            </Button>
            <GoogleLogin />
          </div>

          {/* OR Divider */}
          <div className="relative text-center text-gray-500 my-4">
            <span className="bg-white px-2">or</span>
          </div>

          {/* Login Form */}
          <form className="flex flex-col items-center">
            <div className="mb-4 w-[85%]">
              <Input
                type="email"
                placeholder="Email Id"
                className="w-full p-2 text-sm border border-blue-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div className="mb-4 w-[85%]">
              <Input
                type="password"
                placeholder="Password"
                className="w-full p-2 text-sm border border-blue-300 rounded-md focus:ring-0 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="w-[85%] py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Sign In Now
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600">
              Sign in
            </NavLink>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <NavLink to="/forgot-password" className="text-blue-500">
              Forgot Your Password?
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
