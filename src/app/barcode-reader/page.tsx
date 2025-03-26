import BarcodeReader from "@/components/barcode-reader";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "MRZ/Barcode Reader - MINIAILIVE",
  description: "MRZ/Barcode Reader for MiniAILive Online Demo",
};
const BarcodeReaderPage = () => {
  return (
    <div className="bg-white pt-3">
      <BarcodeReader />
    </div>
  );
};

export default BarcodeReaderPage;
