import SettingsData from "@/components/custom/settingsData";
import SettingsNotifications from "@/components/custom/settingsNotifications";
import SettingsProfile from "@/components/custom/settingsProfile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  // Function to render the component based on the active tab
  const renderComponent = () => {
    switch (activeTab) {
      case "tab1":
        return <SettingsProfile />;
      case "tab2":
        return <SettingsNotifications />;
      case "tab3":
        return <SettingsData />;
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center min-h-screen  py-6 ">
        <div className="lg:w-[95%] h-full bg-white border-2 flex flex-col md:flex-row rounded-xl border-main-300 pb-4 mt-8 lg:mt-0 mx-3 lg:mx-0">
          <div className="mx-3 relative">
            <h1 className="font-bold text-4xl text-main-300  pt-4">
              Hello, John Doe
            </h1>
            <span className=" text-base text-main-300 ">dohnjoe@gmail.com</span>

            <div className="flex md:flex-col flex-wrap md:flex-nowrap space-y-1 my-6 ">
              {/* Tab 1 */}
              <Button
                variant={"outline"}
                className={`hover:bg-main-50 md:w-52 w-1/2 rounded-lg hover:text-main-300 text-main-300 border-0 ${
                  activeTab === "tab1"
                    ? " bg-main-50 font-bold"
                    : "bg-white font-normal"
                }`}
                onClick={() => setActiveTab("tab1")}
              >
                Your Profile
              </Button>

              {/* Tab 2 */}
              <Button
                variant={"outline"}
                className={`hover:bg-main-50  md:w-52 w-1/2  hover:text-main-300 text-main-300 border-0 ${
                  activeTab === "tab2"
                    ? " bg-main-50 font-bold"
                    : "bg-white font-normal"
                }`}
                onClick={() => setActiveTab("tab2")}
              >
                Your Notifications
              </Button>

              {/* Tab 3 */}
              <Button
                variant={"outline"}
                className={`hover:bg-main-50  md:w-52 w-1/2  hover:text-main-300 text-main-300 border-0 ${
                  activeTab === "tab3"
                    ? " bg-main-50 font-bold"
                    : "bg-white font-normal"
                }`}
                onClick={() => setActiveTab("tab3")}
              >
                Your Data
              </Button>

              <div className="flex justify-center md:absolute bottom-0 items-center w-1/2  md:w-52  transform  mb-4">
                <Button
                  variant={"outline"}
                  className=" text-black hover:bg-gray-300 border-none px-6 py-2 w-full rounded-lg "
                  onClick={() => alert("Contact us at support@example.com")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
          <div className="md:px-16 px-4 mt-6 w-full">{renderComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default Settings;
