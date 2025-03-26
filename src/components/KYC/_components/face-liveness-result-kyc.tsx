import Image from "next/image";
import React from "react";

type ExtractedData = {
  "liveness result ": string;
  "probability ": number;
  quality: number;
  "score ": number;
  state: string;
  face: string;
};

// type FaceLiveDetectionResultBoxProps = {
//   extractedData: ExtractedData | null;
//   faceImage: StaticImageData | string;
// };
// const LOCAL_STORAGE_KEY = "kycSelfieData";
const FaceLivenessResultKyc = ({
  parsedSelfieData,
}: {
  parsedSelfieData: ExtractedData;
}) => {
  // const savedFaceLivenessData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const extractedData: ExtractedData = parsedSelfieData;
  console.log("parsedFaceLivenessData", extractedData);
  return (
    <div className="mt-4 flex items-center justify-center px-3 bg-white rounded-[14px]">
      {/* Container for image and details */}
      <div className="flex items-center gap-x-2">
        {/* Display Image */}
        <div className="flex-shrink-0">
          <Image
            src={extractedData?.face}
            alt="Face liveness"
            width={100}
            height={100}
            className="h-[130px] w-[120px] rounded-[20px]"
          />
        </div>

        {/* Attribute Details */}
        <div className="flex-1">
          {/* Attributes */}
          <div className="flex gap-x-2 items-center mb-1">
            <span className="text-[#7E7E7E] text-[17px]">LIVENESS SCORE</span>
            <span className="text-black text-[17px] font-medium">
              {extractedData["probability "]}
            </span>
          </div>

          <div className="flex gap-x-2 items-center">
            <span className="text-[#7E7E7E] text-[17px]">LIVENESS RESULT</span>
            <span
              className={`${
                extractedData["liveness result "] === "Image is genuine"
                  ? "text-[#43A047]"
                  : "text-primary"
              }  text-[17px] font-medium`}
            >
              {extractedData["liveness result "] === "Image is genuine"
                ? "Image is genuine"
                : "Image has a bad quality"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceLivenessResultKyc;
