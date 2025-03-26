import IdRecognition from "@/components/id-document-recognition";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ID Document Recognition - MINIAILIVE",
  description: "ID Document Recognition for MiniAILive Online Demo",
};

const IdDocumentationRecognition = () => {
  return (
    <div className="bg-white pt-3">
      <IdRecognition />
    </div>
  );
};

export default IdDocumentationRecognition;
