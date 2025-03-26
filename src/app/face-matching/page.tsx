import FaceMatching from "@/components/face-matching";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Face Matching - MINIAILIVE",
  description: "Face Matching for MiniAILive Online Demo",
};

const FaceMatchingPage = () => {
  return (
    <div  className="bg-white pt-3">
      <FaceMatching />
    </div>
  );
};

export default FaceMatchingPage;
