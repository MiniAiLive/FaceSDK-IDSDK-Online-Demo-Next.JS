import React from "react";
import loadingAnimation from "@/assets/loading_animation.gif";
import Image from "next/image";

const LoadingPage: React.FC = () => {
  return (
    <div className="h-screen bg-[#F5F8FF] p-5 rounded-t-[20px]">
      <div className="flex flex-col items-center justify-center h-full bg-white rounded-t-[20px]">
        {/* Top Row (Half Circle) */}
        {/* <div className="relative w-[120px] h-4">
        <span className="absolute top-2 left-2 w-6 h-6 bg-orange-200 rounded-full animate-color-change delay-100"></span>
        <span className="absolute top-0 left-8 w-6 h-6 bg-orange-300 rounded-full animate-color-change delay-200"></span>
        <span className="absolute top-2 right-2 w-6 h-6 bg-orange-400 rounded-full animate-color-change delay-300"></span>
        <span className="absolute top-0 right-8 w-6 h-6 bg-orange-400 rounded-full animate-color-change delay-400"></span>
      </div> */}
        <Image src={loadingAnimation} alt="loadingAnimation" />
        {/* Bottom Row (Straight Line with Color Change Animation) */}
        {/* <div className="flex justify-center space-x-3 mt-6">
        <span className="w-6 h-6 bg-orange-200 rounded-full animate-color-change delay-500"></span>
        <span className="w-6 h-6 bg-orange-300 rounded-full animate-color-change delay-600"></span>
        <span className="w-6 h-6 bg-orange-400 rounded-full animate-color-change delay-700"></span>
        <span className="w-6 h-6 bg-orange-500 rounded-full animate-color-change delay-800"></span>
      </div> */}

        {/* Loading Text */}
        <div className=" px-8 py-1">
          <p className="text-orange-500 font-semibold text-lg">
            Loading Results....
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
