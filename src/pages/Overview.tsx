import { useState } from "react";
import { GoDuplicate } from "react-icons/go";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdHistory, MdOutlineCalendarToday } from "react-icons/md";
import { FaRegHeart, FaArrowRight } from "react-icons/fa";
import { PiBagSimpleBold, PiNotebookBold } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useStudentProfile } from "@/services/user/queries";
import { Skeleton } from "@/components/ui/skeleton";

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

type ButtonContent = {
  label: string;
  action: () => void;
  icon?: IconType;
  color?: string;
};

type PopupContent = {
  title?: string;
  description?: string[];
  buttons?: ButtonContent[];
};

const Overview = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentPopupContent, setCurrentPopupContent] =
    useState<PopupContent | null>(null); // Use PopupContent type

  const navigate = useNavigate();

  const handleAction = (box: any) => {
    switch (box.actionType) {
      case "redirect":
        window.location.href = box.route;
        break;
      case "popup":
        if (box.popupType === "confirmation") {
          setCurrentPopupContent(box.popupContent);
          setDialogOpen(true);
        }
        break;
      default:
        break;
    }
  };

  const overviewMap = [
    {
      title: "Mock Interviews",
      boxes: [
        {
          icon: "GoDuplicate" as IconKeys,
          heading: "Setup a Mock Interview",
          subHeading: "Prepare with realistic, AI-driven mock interviews.",
          actionType: "popup",
          popupType: "confirmation",
          popupContent: {
            title: "Heads up!",
            description: [
              "Setting up a mock interview will cost you one credit.",
              "You have 3 Credits left",
            ],
            buttons: [
              {
                label: "Get More Credits",
                action: () => console.log("moved"),
                icon: FaArrowRight,
                color: "bg-main-100",
              },
              {
                label: "Confirm Setup",
                action: () => navigate("/dashboard/setup-interview"),
                color: "bg-main-300",
              },
            ],
          },
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

  const { data, isPending } = useStudentProfile();

  return (
    <>
      <div className="ml-4 pr-4 xl:pr-28 pb-8">
        <h1 className="font-bold text-4xl text-main-300  pt-16 pb-4 lg:py-5 ">
          {isPending ? (
            <>
              <Skeleton className="h-12 w-24 rounded-xl" />
            </>
          ) : (
            <>{`Hello, ${data?.data?.student?.firstname} ${data?.data?.student?.lastname}`}</>
          )}
        </h1>
        {overviewMap.map((section, index) => (
          <div key={index} className="mb-3">
            <h2 className="text-2xl font-bold mb-1">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.boxes.map((box, i) => {
                const IconComponent = PiIcons[box.icon];
                return (
                  <div
                    key={i}
                    className="flex flex-col items-start justify-center p-4 bg-white rounded-lg border-main-300 border-2 h-40 cursor-pointer"
                    onClick={() => handleAction(box)} // Handle click event
                  >
                    <div className="mr-4 text-brandprimary text-2xl mb-3">
                      {IconComponent ? (
                        <IconComponent className="w-9 h-9" />
                      ) : null}
                    </div>
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

      {/* Render Dynamic Dialog */}
      {currentPopupContent && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="md:h-80 lg:w-[45%] w-[90%] rounded-xl border border-main-300">
            {currentPopupContent.title && (
              <DialogHeader>
                <DialogTitle className="text-main-300 font-bold text-5xl text-center mt-4 mb-2">
                  {currentPopupContent.title}
                </DialogTitle>
              </DialogHeader>
            )}
            {currentPopupContent.description && (
              <DialogDescription className="text-main-100 text-md text-center ">
                {Array.isArray(currentPopupContent.description) ? (
                  currentPopupContent.description.map((desc, index) => (
                    <span key={index} className="mb-3 block">
                      {/* Render each description item */}
                      {desc}
                    </span>
                  ))
                ) : (
                  <div>{currentPopupContent.description}</div> // Handle non-array case
                )}
              </DialogDescription>
            )}
            <DialogFooter className="sm:justify-center">
              {currentPopupContent.buttons?.map(
                (button: ButtonContent, index) => (
                  <Button
                    className={`${button.color} my-2 `}
                    key={index}
                    onClick={() => {
                      button.action();
                      setDialogOpen(false); // Close dialog after action
                    }}
                  >
                    {button.label}
                    {/* Render icon if available */}
                    {button.icon && (
                      <button.icon className="ml-2 inline-block" />
                    )}
                  </Button>
                )
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Overview;
