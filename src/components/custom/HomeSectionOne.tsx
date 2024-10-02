import { Button } from "../ui/button";
import interviewImage from "@/assets/interviewImage.png";
const HomeSectionOne = () => {
  return (
    <>
      <div>
        <div
          className="relative w-full h-full bg-cover sm:bg-contain pt-20 bg-[url('/src/assets/home-bg-line1.svg'),url('/src/assets/home-bg-line2.svg'),url('/src/assets/home-bg-line1.svg'),url('/src/assets/home-bg-line3.svg')] bg-center bg-no-repeat"
          style={{
            backgroundPosition:
              "left top, right top, bottom left, bottom right",
            backgroundSize: "50%, 35%, 30%, 20%",
          }}
        >
          <div className="flex  flex-col lg:flex-row justify-around items-center my-12 lg:my-24 ">
            <div className=" w-full lg:w-[40%] lg:ml-28 text-center lg:text-start">
              <div className="font-bold text-main-300 text-6xl">
                Elevate Your Career & Mental Wellbeing
              </div>
              <Button
                className="bg-main-300 text-white rounded-3xl font-bold mt-7 text-md px-6 py-6 "
                style={{
                  boxShadow: "rgba(69, 74, 222, 0.6) 0px 15px 36px 0px",
                }}
              >
                Start Today for Free
              </Button>
            </div>
            <div className=" w-full mt-12 lg:w-1/2 flex justify-center">
              <img
                src={interviewImage}
                className="w-4/5 lg:w-2/3 border-main-50 p-4 border-2 rounded-xl "
                alt="image..."
              />
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center mt-52 lg:mt-72 mb-28">
            <div className="text-main-300 text-3xl text-center px-3">
              Make sure you’re at peak performance with our
            </div>
            <div
              className="font-bold text-3xl text-center px-3"
              style={{
                background:
                  "linear-gradient(to right, #454ADE, black, #454ADE, black)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Interviewer and AI Analytics
            </div>
            <div className=" w-full lg:w-1/2 flex justify-center mt-10">
              <img
                src={interviewImage}
                className="w-4/5 lg:w-2/3 border-main-50 p-4 border-2 rounded-xl "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSectionOne;
