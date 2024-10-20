// @ts-nocheck

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MdMic } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineQuestionMark } from "react-icons/md";
import glow from "../assets/glow.png";
import image from "../assets/Image.jpg";
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from "@aws-sdk/client-transcribe-streaming";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { Buffer } from "buffer";
import { interview_backend } from "@/axiosInstance";

interface Message {
  type: string;
  content: string;
}

const language = "en-US";
const SAMPLE_RATE = 44100;
let transcribeClient = undefined;
let pollyClient = undefined;
let audioContext = undefined;
let sourceNode: MediaStreamAudioSourceNode | undefined = undefined;
let processorNode: AudioNode | undefined = undefined;
let silenceTimeout: NodeJS.Timeout | undefined = undefined;
const SILENCE_TIMEOUT = 12000;

const InterviewScreen = () => {
  const { interviewId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const lastUserMessageRef = useRef<string>("");

  const createMicrophoneStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    audioContext = new window.AudioContext();
    sourceNode = audioContext.createMediaStreamSource(stream);

    processorNode = audioContext.createScriptProcessor(4096, 1, 1);
    sourceNode.connect(processorNode);
    processorNode.connect(audioContext.destination);
  };
  let silenceTimeout: any = null; // Global variable to track the silence timer
  let activeMessage: boolean = false; // Variable to track if a message is currently being updated

  const startRecording = async () => {
    const command = new StartStreamTranscriptionCommand({
      LanguageCode: language,
      MediaEncoding: "pcm",
      MediaSampleRateHertz: SAMPLE_RATE,
      AudioStream: getAudioStream(),
    });

    const data = await transcribeClient!.send(command);

    for await (const event of data.TranscriptResultStream) {
      const results = event.TranscriptEvent.Transcript.Results;
      if (results.length && !results[0]?.IsPartial) {
        const newTranscript = results[0].Alternatives[0].Transcript;
        handleData(newTranscript);
      }
    }
  };

  const handleData = (content: string) => {
    lastUserMessageRef.current += ` ${content}`;
    resetSilenceTimer();
  };

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimeout);

    silenceTimeout = setTimeout(() => {
      // After 10 seconds of silence, treat it as a new message
      if (lastUserMessageRef.current) {
        continueConversation(lastUserMessageRef.current);
        lastUserMessageRef.current = "";
      }
    }, SILENCE_TIMEOUT);
  };

  const stopSilenceTimer = () => {
    clearTimeout(silenceTimeout); // Stop the timer manually if needed
  };

  const getAudioStream = async function* () {
    const audioQueue: { AudioEvent: { AudioChunk: Buffer } }[] = [];
    processorNode.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      const encodedChunk = encodePCMChunk(input);
      if (encodedChunk.length <= SAMPLE_RATE) {
        audioQueue.push({
          AudioEvent: {
            AudioChunk: encodedChunk,
          },
        });
      }
    };

    while (true) {
      if (audioQueue.length > 0) {
        yield audioQueue.shift();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
    }
  };

  const encodePCMChunk = (input: string | any[]) => {
    let offset = 0;
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return Buffer.from(buffer);
  };

  const playAudio = async (text: string) => {
    stopSilenceTimer();

    const pollyRes = await pollyClient.send(
      new SynthesizeSpeechCommand({
        Engine: "neural",
        LanguageCode: "en-US",
        OutputFormat: "mp3",
        Text: text,
        VoiceId: "Matthew",
      })
    );

    const audioContext = new AudioContext();
    const pollyBufferSourceNode = audioContext.createBufferSource();

    pollyBufferSourceNode.buffer = await audioContext.decodeAudioData(
      (
        await pollyRes.AudioStream.transformToByteArray()
      ).buffer
    );

    pollyBufferSourceNode.connect(audioContext.destination);
    pollyBufferSourceNode.start();

    pollyBufferSourceNode.onended = () => {
      resetSilenceTimer();
    };
  };

  const continueConversation = async (userResponse: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "human",
        content: userResponse,
      },
    ]);

    const response = await interview_backend.post(
      `/conversations/continue/${interviewId}`,
      {
        message: userResponse,
      }
    );

    const data = await response.data;

    setMessages((prev) => [
      ...prev,
      {
        type: "ai",
        content: data.message,
      },
    ]);

    playAudio(data.message);
  };

  const stopRecording = async () => {
    processorNode.onaudioprocess = null;
    processorNode.disconnect();
    sourceNode.disconnect();
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      await stopRecording();
    } else {
      setIsRecording(true);
      await startRecording();
    }
  };

  useEffect(() => {
    interview_backend
      .get(`/aws/credentials?interview_id=${interviewId}`)
      .then((response) => {
        const data = response.data;
        const client_params = {
          region: data.region,
          credentials: {
            accessKeyId: data.accessKeyId,
            secretAccessKey: data.secretAccessKey,
            sessionToken: data.sessionToken,
          },
        };

        transcribeClient = new TranscribeStreamingClient(client_params);
        pollyClient = new PollyClient(client_params);

        createMicrophoneStream().then(() => {
          setIsRecording(true);
          startRecording();
        });
      });

    interview_backend
      .post(`/conversations/start/${interviewId}`)
      .then((response) => {
        if (response.status != 200) {
          return;
        }
        const data = response.data;
        console.log(data);
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: data.message,
          },
        ]);
        playAudio(data.message);
      });
  }, []);

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
                  src={glow}
                  alt="Glowing Background"
                  className="w-[28rem] h-[28rem] blur-3xl brightness-150"
                />
              </div>

              {/* Centered image */}
              <div className="relative z-10">
                <img
                  src={image}
                  alt="Centered Image"
                  className="md:w-60 md:h-60 w-48 h-48 mb-5"
                />
              </div>

              {/* Buttons at the bottom */}
              <div className="absolute bottom-4 flex justify-center h-12 space-x-4">
                <button className="px-4 py-2  bg-white text-black rounded-lg">
                  <MdMic className="text-xl" onClick={toggleRecording} />
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
                    key={message.content}
                    className={` p-2 my-2 rounded-xl text-center text-base max-w-56 ${
                      message.type === "ai"
                        ? "bg-main-300 text-white self-end"
                        : "bg-main-50 text-black self-start"
                    }`}
                  >
                    {message.content}
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
