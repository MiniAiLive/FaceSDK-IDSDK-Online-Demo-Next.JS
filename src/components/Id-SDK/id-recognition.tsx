import React, { useState } from "react";
import { ExtractedImage, ExtractedText } from "../svg/id-recognition";
import ImageExtractResult from "./_components/image-extract-result";
import TextExtractResult from "./_components/text-extract-result";

// Type for extracted images
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
  Address?: string;
  "Address City"?: string;
  "Address Jurisdiction Code"?: string;
  "Address Postal Code"?: string;
  "Address State"?: string;
  "Address Street"?: string;
  Age?: string;
  "Age at Issue"?: string;
  "DL Class"?: string;
  "DL Endorsed"?: string;
  "DL Restriction Code"?: string;
  "Date of Birth"?: string;
  "Date of Expiry"?: string;
  "Date of Issue"?: string;
  "Document Discriminator"?: string;
  "Document Name"?: string;
  "Document Number"?: string;
  "Eyes Color"?: string;
  "Full Name"?: string;
  "Given Names"?: string;
  "Hair Color"?: string;
  Height?: string;
  "Issuing State Code"?: string;
  "Issuing State Name"?: string;
  RemainderTerm?: string;
  Sex?: string;
  Status?: string;
  Surname?: string;
  "Years Since Issue"?: string;
};

// Props type for the `IdRecognitionResult` component
type IdDocumentRecognition = {
  extractedData: ExtractedData;
  extractedImages: ExtractedImages;
};

const IdRecognitionResult: React.FC<IdDocumentRecognition> = ({
  extractedData,
  extractedImages,
}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>("text");

  const toggleConditionalText = (id: string) => {
    setExpandedItem(id === "text" ? "text" : "image");
  };

  return (
    <div className="w-full h-[738px] lg:px-4 rounded-t-[20px] bg-[#F5F8FF]">
      <h2 className="text-black text-[24px] font-medium mb-2 pt-4">Result</h2>
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
        <div className="w-full h-full flex items-center justify-center rounded-t-[20px]">
          <p className="text-[#5B5B5B] text-lg">No extracted data available.</p>
        </div>
      )}
    </div>
  );
};

export default IdRecognitionResult;
