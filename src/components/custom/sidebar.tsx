import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";

interface sidebarProps {
  toggleOpen: () => void;
}

const normalLink =
  "flex items-center text-base md:text-md text-main-900 font-normal justify-start gap-2 hover:bg-brandprimary hover:bg-opacity-10  px-3 py-3 ";

// const activeLink =
//   "flex  text-brandprimary text-sm font-semibold items-center justify-start gap-2 bg-white px-3 py-3  border-r-4 border-brandprimary";

const Sidebar = ({ toggleOpen }: sidebarProps) => {
  return (
    <>
      <div className="relative bg-white lg:w-64 flex flex-col border-r-2 border-brightred border-opacity-15 h-screen pt-4 lg:mt-3">
        <NavLink to="/" className="flex items-center justify-start gap-2 mx-4">
          <div className="text-3xl font-bold text-main-900 text-left tracking-wider">
            <span>Mr.Safe</span>
          </div>
        </NavLink>
        <Button
          className="bg-main-300 capitalize justify-start text-base h-12 md:text-md rounded-xl font-bold tracking-wide px-4 mt-8 mx-4 min-w-56"
          onClick={() => {
            toggleOpen();
          }}
        >
          <PiSquaresFourBold className="inline-block rounded-full text-brandprimary w-5 h-5 mr-2 rotate-45" />
          Overview
        </Button>
        <Button
          className="bg-white text-main-900 capitalize justify-start text-base h-12 md:text-md rounded-xl font-normal tracking-wide px-4 mt-3 mx-4 min-w-56"
          onClick={() => {
            toggleOpen();
          }}
        >
          <MdOutlineMail className="inline-block rounded-full text-brandprimary w-5 h-5 mr-2" />
          Inbox
        </Button>

        <div className="absolute w-full bottom-6 left-0 pl-4">
          <div className="pr-4 mb-10">
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
          <NavLink to={"/dashboard/profile"}>
            <button className={cn(normalLink, "w-full")}>
              <CgProfile className=" w-5 h-5" />
              Profile
            </button>
          </NavLink>
          <NavLink to={"/dashboard/settings"}>
            <button className={cn(normalLink, "w-full")}>
              <AiOutlineQuestionCircle className="w-5 h-5" />
              Help
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
