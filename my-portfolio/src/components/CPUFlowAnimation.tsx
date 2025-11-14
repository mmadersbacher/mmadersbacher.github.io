import Lottie from "lottie-react";
import cpuFlowAnimation from "../assets/cpu-flow.json"; // CPU-Flow JSON in assets ablegen

export default function CPUFlowAnimation() {
  return (
    <div
      className="w-40 h-40 pointer-events-none select-none fixed bottom-10 right-10 z-20 opacity-70 hover:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
    >
      <Lottie animationData={cpuFlowAnimation} loop={true} />
    </div>
  );
}
