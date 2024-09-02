import { GoDuplicate } from "react-icons/go";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import { PiNotebookBold } from "react-icons/pi";

// Define a mapping object for icons
const PiIcons = {
  GoDuplicate: GoDuplicate,
  BiBarChartAlt2: BiBarChartAlt2,
  MdHistory: MdHistory,
  FaRegHeart: FaRegHeart,
  MdOutlineCalendarToday: MdOutlineCalendarToday,
  PiBagSimpleBold: PiBagSimpleBold,
  PiNotebookBold: PiNotebookBold,
};
type IconKeys = keyof typeof PiIcons;
const Overview = () => {
  const overviewMap = [
    {
      title: "Mock Interviews",
      boxes: [
        {
          icon: "GoDuplicate" as IconKeys,
          heading: "Setup a Mock Interview",
          subHeading: "Prepare with realistic, AI-driven mock interviews.",
        },
        {
          icon: "BiBarChartAlt2" as IconKeys,
          heading: "View your analytics",
          subHeading: "Track your progress with detailed analytics.",
        },
        {
          icon: "MdHistory" as IconKeys,
          heading: "View your past interviews",
          subHeading: "Revisit your mock interview history.",
        },
      ],
    },
    {
      title: "Your Mental Wellness",
      boxes: [
        {
          icon: "FaRegHeart" as IconKeys,
          heading: "Assess your mental health",
          subHeading: "Quickly assess your current mental health.",
        },
        {
          icon: "MdOutlineCalendarToday" as IconKeys,
          heading: "Book an appointment",
          subHeading: "Schedule an appointment with ease.",
        },
        {
          icon: "MdHistory" as IconKeys,
          heading: "Your wellness history",
          subHeading: "Access your wellness check-ins and progress.",
        },
      ],
    },
    {
      title: "Your Jobs",
      boxes: [
        {
          icon: "PiBagSimpleBold" as IconKeys,
          heading: "Jobs for you",
          subHeading: "Find jobs that match your skills.",
        },
        {
          icon: "PiNotebookBold" as IconKeys,
          heading: "Your Assesments",
          subHeading: "Review your mental health and interview assessments.",
        },
        {
          icon: "BiBarChartAlt2" as IconKeys,
          heading: "Your Analytics",
          subHeading: "Analyze your performance",
        },
      ],
    },
  ];

  return (
    <>
      <div className="ml-4 pr-4 xl:pr-28 pb-8">
        <h1 className="font-bold text-4xl text-main-300 pt-16 pb-4 lg:py-5 ">
          Hello, John Doe
        </h1>
        {overviewMap.map((section, index) => (
          <div key={index} className="mb-3">
            {/* Display the title */}
            <h2 className="text-2xl font-bold mb-1">{section.title}</h2>

            {/* Display the boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.boxes.map((box, i) => {
                const IconComponent = PiIcons[box.icon]; // Dynamically pick the icon component

                return (
                  <div
                    key={i}
                    className="flex flex-col items-start justify-center p-4 bg-white rounded-lg border-main-300 border-2 h-40 "
                  >
                    {/* Render the icon dynamically */}
                    <div className="mr-4 text-brandprimary text-2xl mb-3">
                      {IconComponent ? (
                        <IconComponent className="w-9 h-9" />
                      ) : null}
                    </div>

                    {/* Render the heading and subheading */}
                    <div>
                      <h3 className="text-xl font-bold ">{box.heading}</h3>
                      <p className="text-xs font-bold text-main-100">
                        {box.subHeading}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Overview;
