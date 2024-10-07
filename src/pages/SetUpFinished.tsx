import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const SetUpFinished = () => {
  
  return (
    <>
      <div className=" w-full h-full">
        <div
          className="  h-screen bg-cover flex flex-col items-center justify-center sm:bg-contain bg-[url('/src/assets/bg-line1.svg'),url('/src/assets/bg-line2.svg')] bg-center bg-no-repeat"
          style={{
            backgroundPosition: "left, right",
          }}
        >
          <h2 className="text-main-300 px-2 font-bold text-4xl md:text-5xl text-center my-4">
            You’re all set!
          </h2>
          <div className="font-bold text-lg mb-7">you can now...</div>
          <Button className=" bg-main-300 h-14 flex justify-between rounded-xl w-4/5 lg:w-1/3 text-wrap lg:py-0 mt-4 text-white font-bold text-base mx-auto">
            Try a mock interview
            <FaArrowRightLong className="font-extrabold" />
          </Button>
          <div className="flex items-center w-4/5 lg:w-1/3 justify-center my-4 font-bold">
            <div className="flex-grow border-2 border-main-50"></div>
            <span className="mx-4 text-black">or</span>
            <div className="flex-grow border-2 border-main-50"></div>
          </div>
          <Button className="  h-14 flex border-2 border-main-300 justify-between rounded-xl w-4/5 lg:w-1/3  text-wrap lg:py-0 mt-2 hover:bg-main-300 hover:text-white bg-white text-main-300 font-bold text-base mx-auto">
            Go to your Dashboard
            <FaArrowRightLong className="font-extrabold" />
          </Button>
          <div className="flex flex-col sm:flex-row w-4/5 lg:w-1/3 mt-3 sm:space-x-2">
            <Button className="  h-14 flex border-2 border-main-100 text-center hover:text-white hover:bg-main-100 justify-between rounded-xl w-full sm:w-1/2  text-wrap lg:py-0 mt-4 bg-white text-main-100 font-bold text-base mx-auto">
              Take Assesments
            </Button>
            <Button className="  h-14 flex border-2 border-main-100 text-center  hover:text-white hover:bg-main-100 justify-between rounded-xl w-full sm:w-1/2  text-wrap lg:py-0 mt-4 bg-white text-main-100 font-bold text-base mx-auto">
              Assess your mental health
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpFinished;
