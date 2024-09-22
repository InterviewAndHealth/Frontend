import { MdFace } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { FaCircleDot } from "react-icons/fa6";
import { Button } from "../ui/button";

const HomeSectionThree = () => {
  const mapper = [
    {
      title: "Interview Prep",
      desc: "Ace your interviews with AI-powered practice sessions.",
      icon: <MdFace className="w-14 h-14" />,
    },

    {
      title: "Jobs",
      desc: "Discover tailored job opportunities that match your skills and career goals.",
      icon: <BiSolidPencil className="w-14 h-14" />,
    },
    {
      title: "Wellness",
      desc: "Prioritize your well-being with 24/7 access to mental health resources and support.",
      icon: <FaCircleDot className="w-14 h-14" />,
    },
  ];

  return (
    <>
      <div className="mt-36">
        <div
          className=" text-4xl lg:ml-32 text-center lg:text-start"
          style={{
            background:
              "linear-gradient(to right, #454ADE, black, #454ADE, black)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          From <span className="font-bold"> Wealth</span> to
          <span className="font-bold"> Wellness</span>
        </div>
        <div className="lg:ml-32 mb-16 text-xl mt-4 lg:mt-0 text-center lg:text-start">
          We’ve got you covered
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center w-2/3 space-y-16 lg:space-y-0 lg:space-x-16 mx-auto">
          {mapper.map((element) => (
            <div
              className=" rounded-xl w-4/5 lg:w-1/5 p-4 min-h-64"
              style={{
                boxShadow: "rgba(69, 74, 222, 0.4) 0px 12px 36px 0px",
              }}
              key={element.title}
            >
              {element.icon}
              <div className="font-bold my-3 text-2xl w-2/3">
                {element.title}
              </div>
              <div>{element.desc}</div>
            </div>
          ))}
        </div>

        <div
          className=" text-5xl w-11/12 lg:w-7/12 mx-auto text-center mt-56"
          style={{
            background:
              "linear-gradient(to right, #454ADE, black, #454ADE, black)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Take your career and wellbeing to the
          <span className="font-bold"> next level </span>now
          <Button
            className="bg-main-300 text-white rounded-3xl font-bold mt-8 block mx-auto"
            style={{
              boxShadow: "rgba(69, 74, 222, 0.6) 0px 15px 36px 0px",
            }}
          >
            Sign up for free
          </Button>
        </div>
        <div className="w-full h-72 relative overflow-hidden">
          <div
            className="w-1/2 h-1/2 rounded-full absolute left-1/2 blur-3xl bottom-[-20%] transform -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(69, 74, 222, 1))",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomeSectionThree;
