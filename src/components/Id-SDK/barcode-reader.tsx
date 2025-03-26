import React, { useState } from "react";
import { ExtractedImage, ExtractedText } from "../svg/id-recognition";
import ImageExtractResult from "./_components/image-extract-result";
import TextExtractResult from "./_components/text-extract-result";

type ExtractedImages = {
  Document?: {
    image: string;
  };
  "Ghost portrait"?: {
    image: string;
  };
  "Portrait-V"?: {
    image: string;
    Position?: {
      x1?: number;
      x2?: number;
      y1?: number;
      y2?: number;
    };
  };
  Signature?: {
    image: string;
  };
} | null;

// Type for the extracted data from the ID
type ExtractedData = {
  "Date of Birth"?: string;
  "Date of Expiry"?: string;
  "Document Class Code"?: string;
  "Document Number"?: string;
  "Full Name"?: string;
  "Issuing State Code"?: string;
  "Issuing State Name"?: string;
  "MRZ Strings"?: string;
  "MRZ Type"?: string;
  "Personal Number"?: string;
  Sex?: string;
  Surname?: string;
};

type BarcodeType = {
  extractedData: ExtractedData;
  extractedImages: ExtractedImages;
};

const BarcodeReaderResult: React.FC<BarcodeType> = ({
  extractedData,
  extractedImages,
}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>("text");

  const toggleConditionalText = (id: string) => {
    setExpandedItem(id === "text" ? "text" : "image");
  };

  return (
    <div className="w-full h-[746px] lg:px-4 py-6 rounded-t-[20px] bg-[#F5F8FF]">
      <h2 className="text-black text-[24px] font-medium mb-2">Result</h2>
      <ul className="bg-white rounded-[20px] flex justify-around mb-2 p-3">
        <li
          onClick={() => toggleConditionalText("text")}
          className={`text-[16px] font-medium ${
            expandedItem === "text" ? "text-[#FF5000]" : "text-[#7E7E7E]"
          } flex gap-x-2 items-center cursor-pointer`}
        >
          <ExtractedText
            fill={expandedItem === "text" ? "#FF5000" : "#7E7E7E"}
          />
          Extracted Text
        </li>
        <li
          onClick={() => toggleConditionalText("image")}
          className={`text-[16px] font-medium ${
            expandedItem === "image" ? "text-[#FF5000]" : "text-[#7E7E7E]"
          } flex gap-x-2 items-center cursor-pointer`}
        >
          <ExtractedImage
            fill={expandedItem === "image" ? "#FF5000" : "#7E7E7E"}
          />
          Extracted Image
        </li>
      </ul>
      {extractedData || extractedImages ? (
        <div>
          {expandedItem === "text" ? (
            <TextExtractResult extractedData={extractedData} />
          ) : (
            <ImageExtractResult extractedImages={extractedImages} />
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-[20px]">
          <p className="text-[#5B5B5B] text-lg">No extracted data available.</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeReaderResult;
