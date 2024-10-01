
import Lottie from "react-lottie";
import animationData from "@/assets/loaderLottie.json";

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-screen h-screen grid place-items-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
