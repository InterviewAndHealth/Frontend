import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Progress } from "@/components/ui/progress";
import { MdLogout } from "react-icons/md";
import { Button } from "@/components/ui/button";

interface sidebarProps {
  toggleOpen: () => void;
}

const normalLink =
  "flex items-center text-base md:text-md text-main-900 font-normal justify-start gap-2 hover:bg-brandprimary hover:bg-opacity-10  px-3 py-3 ";

// const activeLink =
//   "flex  text-brandprimary text-sm font-semibold items-center justify-start gap-2 bg-white px-3 py-3  border-r-4 border-brandprimary";

const Sidebar = ({ toggleOpen }: sidebarProps) => {
  function logout(){
    localStorage.removeItem('auth-token');
    window.location.href = '/';
  }
  return (
    <>
      <div className="relative bg-white lg:w-64 flex flex-col border-r-2 border-brightred border-opacity-15 h-screen pt-4 lg:mt-3">
        <NavLink to="/" className="flex items-center justify-start gap-2 mx-4">
          <div className="text-3xl font-bold text-main-900 text-left tracking-wider">
            <span>Mr.Safe</span>
          </div>
        </NavLink>
        <NavLink
          to={"/dashboard/overview"}
          className="bg-main-300 capitalize flex justify-start items-center text-white text-base  h-12 md:text-md rounded-xl font-bold tracking-wide px-4 mt-8 mx-4 min-w-56"
          onClick={() => {
            toggleOpen();
          }}
        >
          <PiSquaresFourBold className="inline-block rounded-full  text-brandprimary w-5 h-5 mr-2 rotate-45" />
          Overview
        </NavLink>
        <Button
          className="bg-white text-main-900 capitalize justify-start hover:bg-slate-800 hover:text-white text-base h-12 md:text-md rounded-xl font-normal tracking-wide px-4 mt-3 mx-4 min-w-56"
          onClick={() => {
            toggleOpen();
          }}
        >
          <MdOutlineMail className="inline-block rounded-full text-brandprimary w-5 h-5 mr-2" />
          Inbox
        </Button>
        <div className="px-4 mt-4">
          <div className="mb-10">
            <h3 className="font-bold text-sm mb-2">John Doe’s credits left</h3>
            <h3 className="font-bold text-sm mb-1">3 credits</h3>
            <Progress value={80} />
            <h4 className="text-sm mb-2 mt-1">
              That’s good for 3 more mock interviews!
            </h4>
            <h4 className="text-sm">
              you can buy more{" "}
              <Link to={"/"} className=" underline">
                here
              </Link>
            </h4>
          </div>
        </div>

        <div className="absolute w-full bottom-6 left-0 px-4">
          <NavLink to={"/dashboard/settings"}>
            <button className={cn(normalLink, "w-full hover:bg-gray-950")}>
              <CgProfile className=" w-5 h-5" />
              Profile
            </button>
          </NavLink>
          <NavLink to={"/dashboard/settings"}>
            <button className={cn(normalLink, "w-full hover:bg-gray-950")}>
              <AiOutlineQuestionCircle className="w-5 h-5" />
              Help
            </button>
          </NavLink>
          <NavLink to={"/dashboard/settings"}>
            <button
              className={cn(
                normalLink,
                "w-full text-red-500 hover:bg-gray-950"
              )}
              onClick={logout}
            >
              <MdLogout className="w-5 h-5" />
              Sign Out
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
