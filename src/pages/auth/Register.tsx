


import { NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";

import { useState } from "react";

const Register = () => {


  
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#dcdcf8] via-[#0f0f60] to-[#01010f]">
      <Card className="w-full max-w-md rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-blue-700">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mb-4">
            <Button className="flex items-center justify-center w-1/2 mr-2 py-2 px-4 bg-white text-blue-700 border border-gray-300 rounded-md shadow hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn"
                className="w-5 h-5 mr-2"
              />
              Continue with LinkedIn
            </Button>
            <Button className="flex items-center justify-center w-1/2 ml-2 py-2 px-4 bg-white text-blue-700 border border-gray-300 rounded-md shadow hover:bg-gray-100">
              <img
                src="src\assets\google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Button>
          </div>

          <div className="text-center text-gray-500 my-4">or</div>

         
            <div className="flex mb-4 space-x-2">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                
                className="w-1/2 p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
               
                className="w-1/2 p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Email Id"
              
                className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                name="password"
                placeholder="Password"
              
                className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
               
                className="mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <NavLink to="/terms" className="text-blue-600">
                  Terms and Conditions
                </NavLink>{" "}
                and{" "}
                <NavLink to="/policy" className="text-blue-600">
                  Privacy Policy
                </NavLink>
              </label>
            </div>

            <Button
              type="submit"
              className={`w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
              
            >
              Sign Up Now
            </Button>
         
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600">
              Sign in
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
