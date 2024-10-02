import { useState } from "react";
import interviewImage from "@/assets/interviewImage.png";
import tripleCircles from "@/assets/tripleCircles.png";

const HomeSectionTwo = () => {
  const [activeTab, setActiveTab] = useState("Path");
  const renderComponent = (title: string) => {
    switch (title) {
      case "Path":
        return (
          <div className=" w-4/5 flex justify-center ">
            <img
              src={interviewImage}
              className=" border-main-50 p-4 border-2 rounded-xl "
              alt=""
            />
          </div>
        );

      case "Opportunities":
        return (
          <div className=" w-2/3 flex justify-center items-center">
            <img src={tripleCircles} alt="" />
          </div>
        );

      case "Balance":
        return (
          <div className=" w-2/3 flex justify-center items-center">
            <img src={tripleCircles} alt="" />
          </div>
        );
    }
  };

  const mapper: { title: string; desc: string }[] = [
    {
      title: "Path",
      desc: "Chart your course to success with AI-powered interview prep sessions that guide you every step of the way.",
    },
    {
      title: "Opportunities",
      desc: "Unlock a world of tailored job roles that perfectly align with your unique skills and career aspirations.",
    },
    {
      title: "Balance",
      desc: "Maintain your well-being with round-the-clock access to mental health resources and personalized support.",
    },
  ];

  return (
    <>
      <div
        className="flex flex-col items-center justify-center my-44 bg-cover sm:bg-contain pt-20 bg-[url('/src/assets/home-bg-line1.svg'),url('/src/assets/home-bg-line3.svg')] bg-center bg-no-repeat"
        style={{
          backgroundPosition: "left top, right bottom",
          backgroundSize: "30%,15%",
        }}
      >
        <div className="text-main-300 text-3xl text-center px-4">
          Balance <span className="font-bold">Goals</span> and
          <span className="font-bold"> Growth</span> and
          <span className="font-bold"> Wellness</span> ,
          <span className="font-bold"> Effectively.</span>
        </div>

        <div className="border-main-300 w-4/5 lg:w-2/3 flex items-center bg-white justify-center border-2 rounded-lg mt-8">
          <div className=" w-full lg:w-1/3 lg:border-main-300 rounded-lg border-r-2">
            {mapper.map((element, index) => (
              <div
                key={element.title}
                className={`p-4 ${
                  index !== mapper.length - 1
                    ? "border-b-2 border-main-300"
                    : ""
                }  ${
                  activeTab === element.title
                    ? "text-main-300 bg-main-50/30"
                    : ""
                }`}
                onClick={() => setActiveTab(element.title)}
              >
                <div className="my-2 font-bold">{element.title}</div>
                <div className="mb-2">{element.desc}</div>
              </div>
            ))}
          </div>
          {/* Right child div */}
          <div className=" hidden w-2/3 lg:flex justify-center items-center">
            {renderComponent(activeTab)}
          </div>
        </div>
        <div className=" w-full lg:hidden flex mt-10 justify-center items-center">
          {renderComponent(activeTab)}
        </div>
      </div>
    </>
  );
};

export default HomeSectionTwo;
