import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LuMic } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const SetUpInterview = () => {
  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className="lg:w-3/4 w-[90%]  h-5/6 bg-white border-2 rounded-xl border-main-300">
          <h2 className="text-main-300 px-2 font-bold text-4xl md:text-5xl text-center mt-4 mb-2">
            Setup A Mock Interview
          </h2>

          <h4 className="text-main-100 font-bold text-md text-center">
            Choose your interview preferences
          </h4>
          <h5 className="text-main-100 font-bold text-sm mt-4 md:w-1/2 w-5/6 mx-auto">
            Paste or choose from our database of job descriptions.
          </h5>
          <Textarea className="border-2 rounded-lg border-main-300 md:w-1/2 w-5/6 mx-auto my-2" />

          <h5 className="text-main-100 font-bold text-sm mt-4 md:w-1/3 w-5/6 mx-auto">
            Job Type
          </h5>
          <Select>
            <SelectTrigger className=" md:w-1/3 w-5/6  border-main-300 border-2 mx-auto">
              <SelectValue placeholder="Civil , MBA , consulting ..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Civil">Civil</SelectItem>
              <SelectItem value="MBA">MBA</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>

          <h5 className="text-main-100 font-bold text-sm mt-6 md:w-1/3 w-5/6 mx-auto">
            Interview Type
          </h5>
          <Select>
            <SelectTrigger className=" md:w-1/3 w-5/6  border-main-300 border-2 mx-auto">
              <SelectValue placeholder="Behavioural , coding..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Behavioural">Behavioural</SelectItem>
              <SelectItem value="coding">coding</SelectItem>
            </SelectContent>
          </Select>

          <h5 className="text-main-100 font-bold text-sm mt-6 md:w-1/3 w-5/6 mx-auto">
            Choose interview difficulty
          </h5>
          <div className="flex justify-center mt-1">
            <div className="  md:w-1/3 w-5/6">
              <Button className="text-main-100 mr-2 bg-white border-2 border-main-300">
                Easy
              </Button>
              <Button className="text-main-100 mr-2 bg-white border-2 border-main-300">
                Medium
              </Button>
              <Button className="text-main-100 mr-2 bg-white border-2 border-main-300">
                Hard
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger className="text-white bg-main-300 border-2 mt-8 md:w-1/3 w-5/6  mx-auto border-main-300 h-12 rounded-lg">
                Confirm
              </DialogTrigger>
              <DialogContent className="h-1/2 lg:w-1/2 w-[90%] rounded-xl border border-main-300">
                <DialogHeader>
                  <DialogTitle className="text-main-300 font-bold text-4xl text-center mt-4 mb-2">
                    Setup A Mock Interview
                  </DialogTitle>
                  <DialogDescription className="text-main-100 text-md text-center ">
                    Make sure your mic is working so we can hear your responses
                  </DialogDescription>
                  <div className="flex justify-center py-8">
                    <Progress value={33} className="rounded-sm w-3/5 h-5 " />
                  </div>
                  <DialogDescription className="text-main-100 text-md text-center justify-center pb-6 flex items-center">
                    <LuMic className="bg-main-300 text-white p-2 w-9 h-9 rounded-lg mr-3" />
                    <span className="my-auto">
                      Click the microphone then speak to test
                    </span>
                  </DialogDescription>

                  <NavLink
                    to={"/interview"}
                    className="flex items-center justify-center text-white bg-main-300 border-2 text-center md:w-2/5 h-12 w-5/6 mx-auto rounded-lg"
                  >
                    Start Interview
                  </NavLink>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpInterview;
