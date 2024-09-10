import { MdMic } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineQuestionMark } from "react-icons/md";

const InterviewScreen = () => {
  const messages = [
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: "interviewer",
    },
    {
      id: 2,
      text: "I have a few questions about the project.",
      sender: "user",
    },
    { id: 3, text: "Sure! Feel free to ask.", sender: "interviewer" },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis natus voluptas quia nemo neque maiores cupiditate fugiat exercitationem corrupti culpa, cum esse sunt velit minus omnis, temporibus quae vitae voluptatibus?",
      sender: "user",
    },
    {
      id: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis natus voluptas quia nemo neque maiores cupiditate fugiat exercitationem corrupti culpa, cum esse sunt velit minus omnis, temporibus quae vitae voluptatibus?",
      sender: "user",
    },
  ];
  return (
    <>
      <div className="relative w-full h-screen">
        <div
          className="relative w-full h-screen bg-cover flex items-center justify-center sm:bg-contain bg-[url('/src/assets/bg-line1.svg'),url('/src/assets/bg-line2.svg')] bg-center bg-no-repeat "
          style={{
            backgroundPosition: "left, right",
          }}
        >
          <div className="flex items-center md:flex-row flex-col justify-center w-full md:w-[85%] h-[95%] md:h-[80%] bg-white relative">
            <div className="md:w-[77%] w-11/12 h-full mb-3 md:mb-0  bg-black rounded-xl relative flex flex-col items-center justify-center">
              {/* Glowing background image */}
              <div className="absolute inset-0 flex justify-center items-center">
                <img
                  src="src/assets/glow.png"
                  alt="Glowing Background"
                  className="w-[28rem] h-[28rem] blur-3xl brightness-150"
                />
              </div>

              {/* Centered image */}
              <div className="relative z-10">
                <img
                  src="src/assets/Image.jpg"
                  alt="Centered Image"
                  className="md:w-60 md:h-60 w-48 h-48 mb-5"
                />
              </div>

              {/* Buttons at the bottom */}
              <div className="absolute bottom-4 flex justify-center h-12 space-x-4">
                <button className="px-4 py-2  bg-white text-black rounded-lg">
                  <MdMic className="text-xl" />
                </button>
                <button className="px-4 py-2 bg-[#FF6262] w-28  text-black rounded-lg">
                  <MdCallEnd className="text-xl mx-auto" />
                </button>
                <button className="px-4 py-2 bg-white text-black rounded-lg">
                  <MdOutlineQuestionMark className="text-xl" />
                </button>
              </div>
            </div>
            <div className="bg-white border-2 border-main-50 md:ml-3 rounded-xl w-11/12 md:w-[23%] h-1/2 md:h-full">
              <h3 className="font-bold text-base mt-3 text-center">
                Live Transcript
              </h3>
              <div className=" flex flex-col w-full max-w-lg mx-auto p-4 h-[90%] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={` p-2 my-2 rounded-xl text-center text-base max-w-56 ${
                      message.sender === "user"
                        ? "bg-main-300 text-white self-end"
                        : "bg-main-50 text-black self-start"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewScreen;
