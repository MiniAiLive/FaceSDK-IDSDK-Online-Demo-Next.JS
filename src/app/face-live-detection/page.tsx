import FaceLiveDetection from "@/components/face-live-detection";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Face Liveness Detection - MINIAILIVE",
  description: "Face Liveness Detection for MiniAILive Online Demo",
};

const FaceLiveDetectionPage = () => {
  return (
    <section className="bg-white pt-3">
      <div>
        <h1 className="text-center text-[36px] font-medium text-black mt-2 mb-3">
          {" "}
          Passive Face Liveness Detection
        </h1>
      </div>
      <FaceLiveDetection />
    </section>
  );
};

export default FaceLiveDetectionPage;
