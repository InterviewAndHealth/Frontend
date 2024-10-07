import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LuMic } from "react-icons/lu";
// import { NavLink } from "react-router-dom";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Notify from "@/lib/notify";
import { interviewData } from "@/types/interview";
import { useCreateInterview } from "@/services/interview/mutations";
import { Loader2 } from "lucide-react";

const SetUpInterview = () => {
  const [form, setForm] = useState<interviewData>({
    jobdescription: "",
    jobfield: "",
    difficulty: "",
    interviewtype: "",
  });

  const [open, setOpen] = useState(false);

  const [formProgress, setFormProgress] = useState(0);

  const [micWorking, setMicWorking] = useState<boolean | null>(null);
  const [voiceLevel, setVoiceLevel] = useState<number>(0);

  const createInterview = useCreateInterview();

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleChange = () => {
    if (!form.jobdescription) {
      Notify("error", "Job description Required");
      return;
    }
    if (!form.jobfield) {
      Notify("error", "Job Field Required");
      return;
    }
    if (!form.difficulty) {
      Notify("error", "Difficulty Required");
      return;
    }
    if (!form.interviewtype) {
      Notify("error", "Interview Type Required");
      return;
    }

    setOpen(true);
    setFormProgress(50);
  };

  const handleSubmit = () => {
    console.log(form);
    createInterview.mutate(form);
  };

  const checkMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256; // Higher value gives more frequency data
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const threshold = 20; // Minimum voice level to consider microphone working
      let stableCounter = 0; // Counts how many times we meet the threshold
      const requiredStabilityCount = 10; // How many times the threshold must be passed to be considered working

      const checkVoiceLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const maxVolume = Math.max(...dataArray);

        setVoiceLevel(maxVolume);

        if (maxVolume > threshold) {
          stableCounter += 1;
        } else {
          stableCounter = 0;
        }

        if (stableCounter >= requiredStabilityCount) {
          setMicWorking(true);
        } else {
          setMicWorking(false);
        }

        animationFrameRef.current = requestAnimationFrame(checkVoiceLevel);
      };

      checkVoiceLevel();
    } catch (error) {
      setMicWorking(false);
      console.log(error);

      Notify(
        "error",
        "Unable to access the microphone. Please check your permissions."
      );
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup resources when the component unmounts
      if (microphoneRef.current) {
        microphoneRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className="lg:w-3/4 w-[90%] h-5/6 md:h-[95%] bg-white border-2 rounded-xl border-main-300">
          <h2 className="text-main-300 px-2 font-bold text-4xl md:text-5xl text-center mt-4 mb-2">
            Setup A Mock Interview
          </h2>

          <h4 className="text-main-100 font-bold text-md text-center">
            Choose your interview preferences
          </h4>
          <h5 className="text-main-100 font-bold text-sm mt-4 md:w-1/2 w-5/6 mx-auto">
            Paste or choose from our database of job descriptions.
          </h5>
          <Textarea
            className="border-2 rounded-lg border-main-300 md:w-1/2 w-5/6 mx-auto my-2"
            onChange={(e) => {
              setForm({ ...form, jobdescription: e.target.value });
            }}
          />

          {/* <h5 className="text-main-100 font-bold text-sm mt-4 md:w-1/3 w-5/6 mx-auto">
            Job Field
          </h5>
          <div className="flex justify-center mt-1">
            <ToggleGroup
              type="multiple"
              className="md:w-1/3 w-5/6 justify-start flex flex-wrap"
            >
              {[
                "MBA",
                "Civil Services",
                "Internships",
                "Full-time",
                "Freelance",
                "Contract",
              ].map((level) => (
                <ToggleGroupItem
                  key={level}
                  value={level}
                  aria-label={`Set difficulty to ${level}`}
                  className="border-2 border-main-300 text-main-100 "
                >
                  {level}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div> */}

          <h5 className="text-main-100 font-bold text-sm mt-4 md:w-1/3 w-5/6 mx-auto">
            Job Type
          </h5>
          <Select
            onValueChange={(val) => {
              setForm({ ...form, jobfield: val });
            }}
          >
            <SelectTrigger className=" md:w-1/3 w-5/6  border-main-300 border-2 mx-auto">
              <SelectValue placeholder="Civil , MBA , consulting ..." />
            </SelectTrigger>
            <SelectContent>
              {["civil", "mba", "consulting"].map((ele, idx) => (
                <SelectItem key={idx} value={ele}>
                  {ele.toUpperCase()}
                </SelectItem>
              ))}
              {/* <SelectItem value="Civil">Civil</SelectItem>
              <SelectItem value="MBA">MBA</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem> */}
            </SelectContent>
          </Select>

          <h5 className="text-main-100 font-bold text-sm mt-6 md:w-1/3 w-5/6 mx-auto">
            Interview Type
          </h5>
          <Select
            onValueChange={(val) => {
              setForm({ ...form, interviewtype: val });
            }}
          >
            <SelectTrigger className=" md:w-1/3 w-5/6  border-main-300 border-2 mx-auto">
              <SelectValue placeholder="Behavioural , coding..." />
            </SelectTrigger>
            <SelectContent>
              {["behaviour", "coding", "communication", "knowledge"].map(
                (ele, idx) => (
                  <SelectItem key={idx} value={ele}>
                    {ele.toUpperCase()}
                  </SelectItem>
                )
              )}
              {/* <SelectItem value="Behavioural">Behavioural</SelectItem>
              <SelectItem value="coding">coding</SelectItem> */}
            </SelectContent>
          </Select>

          <h5 className="text-main-100 font-bold text-sm mt-6 md:w-1/3 w-5/6 mx-auto">
            Choose interview difficulty
          </h5>
          <div className="flex justify-center mt-1">
            <ToggleGroup
              type="single"
              className="md:w-1/3 w-5/6 justify-start"
              onValueChange={(val) => {
                setForm({ ...form, difficulty: val });
              }}
            >
              {["easy", "medium", "hard"].map((level, idx) => (
                <ToggleGroupItem
                  key={idx}
                  value={level}
                  aria-label={`Set difficulty to ${level}`}
                  className={` border-2 border-main-300 text-main-100`}
                >
                  {level.toUpperCase()}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex justify-center">
            <Button
              className="text-white bg-main-300 border-2 mt-8 md:w-1/3 w-5/6  mx-auto border-main-300 h-12 rounded-lg"
              onClick={handleChange}
            >
              Confirm
            </Button>
            <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
              <DialogContent className="h-[60%] lg:w-1/2 w-[90%] rounded-xl border border-main-300">
                <DialogHeader>
                  <DialogTitle className="text-main-300 font-bold text-4xl text-center mt-4 mb-2">
                    Setup A Mock Interview
                  </DialogTitle>
                  <DialogDescription className="text-main-100 text-md text-center ">
                    Make sure your mic is working so we can hear your responses
                  </DialogDescription>
                  <div className="flex justify-center py-8">
                    <Progress
                      value={formProgress}
                      className="rounded-sm w-3/5 h-5 "
                    />
                  </div>
                  <DialogDescription className="text-main-100 text-md text-center justify-center pb-2 flex items-center">
                    <LuMic
                      className="bg-main-300 text-white p-2 w-9 h-9 rounded-lg mr-3"
                      onClick={checkMicrophone}
                    />
                    <span className="my-auto">
                      Click the microphone then speak to test
                    </span>
                  </DialogDescription>

                  {micWorking && (
                    <div className="text-center pb-4">
                      <h5 className="text-main-100 font-bold text-sm">
                        Voice Level
                      </h5>
                      <Progress
                        value={(voiceLevel / 256) * 100} // Normalize to 0-100%
                        className="rounded-sm w-1/5 h-2 mx-auto"
                      />
                    </div>
                  )}

                  <Button
                    className="flex items-center justify-center text-white bg-main-300 border-2 text-center md:w-2/5 h-12 w-5/6 mx-auto rounded-lg"
                    disabled={!micWorking || createInterview.isPending}
                    onClick={handleSubmit}
                  >
                    {createInterview.isPending && (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    )}
                    Start Interview
                  </Button>
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
