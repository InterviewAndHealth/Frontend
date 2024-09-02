import Sidebar from "@/components/custom/sidebar";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative flex">
        <div
          className="lg:hidden fixed top-4 left-4 z-50 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <IoReorderThreeOutline size={40} />
        </div>
        <div
          className={`fixed ${
            open ? "-translate-x-0" : "-translate-x-96"
          } ease-in-out lg:translate-x-0 transition-all delay-75 lg:left-0 top-0 z-50`}
        >
          <Sidebar toggleOpen={() => setOpen(false)} />
        </div>
        <div className="ml-0 lg:ml-[16rem] relative w-full h-screen">
          <div
            className="relative w-full h-screen bg-cover  sm:bg-contain bg-[url('/src/assets/bg-line1.svg'),url('/src/assets/bg-line2.svg')] bg-center bg-no-repeat "
            style={{
              backgroundPosition: "left, right",
            }}
          >
            <Outlet />
          </div>
        </div>
        {open && (
          <div
            className="h-screen w-screen transition-all ease-in-out delay-25 absolute left-0 top-0 bg-black bg-opacity-70 "
            onClick={() => setOpen(!open)}
          ></div>
        )}
      </div>
    </>
  );
};

export default DashBoardLayout;
