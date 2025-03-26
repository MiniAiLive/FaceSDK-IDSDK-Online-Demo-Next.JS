import IdDocumentLiveness from "@/components/id-document-liveness";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ID Document Liveness - MINIAILIVE",
  description: "ID Document Liveness for MiniAILive Online Demo",
};

const IdDocumentLivenessPage = () => {
  return (
    <div className="bg-white pt-3">
      <IdDocumentLiveness />
    </div>
  );
};

export default IdDocumentLivenessPage;
