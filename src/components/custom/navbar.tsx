import { useState, useEffect } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { jwtDecode } from "jwt-decode";
import Notify from "@/lib/notify";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  function logout() {
    localStorage.removeItem("auth-token");
    window.location.href = "/";
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) setToken(token);
  }, []);

  const redirect = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken && decodedToken.exp) {
        if (decodedToken.exp < currentTime) {
          Notify("info", "Session expired!!");
          localStorage.removeItem("auth-token");
          window.location.href = "/";
          return;
        } else {
          window.location.href = "/dashboard/overview";
        }
      } else {
        Notify("info", "Session expired!!");
        localStorage.removeItem("auth-token");
        window.location.href = "/";
      }
    } else {
      Notify("info", "Session expired!!");
      localStorage.removeItem("auth-token");
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* Navbar for larger screens */}
      <div
        className={`hidden fixed z-20 w-full py-6 pt-10 md:flex justify-around transition duration-300 ${
          scrolling
            ? "bg-white/70 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="space-x-12">
          <span className="font-bold">Logo</span>
          <span>For Companies</span>
          <span>Pricing</span>
        </div>
        <div className="space-x-12">
          {!token && (
            <Button
              variant="ghost"
              className="font-bold"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          )}
          {token && (
            <Button variant="ghost" className="font-bold" onClick={redirect}>
              Dashboard
            </Button>
          )}
          {token && (
            <span
              className="bg-main-300 text-white rounded-xl p-3 hover:cursor-pointer "
              onClick={logout}
            >
              Logout
            </span>
          )}
          {!token && (
            <Link
              className="bg-main-300 text-white rounded-xl p-3"
              to={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <div
        className={` md:hidden w-full z-10 h-14 fixed backdrop:bl top-0 flex justify-end ${
          scrolling
            ? "bg-white/70 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div
          className="block bg-transparent p-2 text-black"
          onClick={handleOpen}
        >
          <HiOutlineBars3 className="h-10 w-10" />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`bg-white/20 backdrop-blur-md text-white w-full h-screen fixed top-0 right-0 z-50 duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2  flex justify-end">
          <div className="text-white bg-transparent" onClick={handleOpen}>
            <IoClose className="h-10 w-10 text-black" />
          </div>
        </div>

        <div className=" flex space-y-10 mt-28 font-bold text-2xl flex-col justify-center text-black items-center">
          <div>Logo</div>
          <div>For Companies</div>
          <div>Pricing</div>
          {!token && (
            <Button
              variant="default"
              className="font-bold"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          )}
          {token && (
            <Button variant="default" className="font-bold" onClick={redirect}>
              Dashboard
            </Button>
          )}
          <span className="bg-main-300 text-white rounded-xl p-3">
            Go to MIP
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
