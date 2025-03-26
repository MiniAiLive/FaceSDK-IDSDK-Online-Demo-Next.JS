import React from "react";
import Image, { StaticImageData } from "next/image";
// import image from "../../assets/face-detection/image-1.png";

// Define the type for extractedData
type ExtractedData = {
  "liveness result ": string;
  "probability ": number;
  quality: number;
  "score ": number;
  state: string;
};

type FaceLiveDetectionResultBoxProps = {
  extractedData: ExtractedData | null;
  faceImage: StaticImageData | string;
};

const FaceLiveDetectionResultBox: React.FC<FaceLiveDetectionResultBoxProps> = ({
  extractedData,
  faceImage,
}) => {
  return (
    <section className="w-full h-[734px] px-4 py-4 rounded-t-[20px] bg-[#F5F8FF]">
      <h2 className="text-black text-[24px] font-medium mb-2">Result</h2>
      <div className="h-[700px] overflow-y-auto scrollBarThin">
        {extractedData ? (
          <div className="h-[141px] flex items-center px-3 bg-white rounded-[14px]">
            {/* Container for image and details */}
            <div className="flex items-center gap-x-2">
              {/* Display Image */}
              <div className="flex-shrink-0">
                <Image
                  src={faceImage}
                  alt="Accordion Thumbnail"
                  width={108}
                  height={108}
                  className="rounded-[20px] object-cover h-[104px] w-[104px]"
                />
              </div>

              {/* Attribute Details */}
              <div className="flex-1">
                {/* Attributes */}
                <div className="flex gap-x-2 items-center mb-1">
                  <span className="text-[#7E7E7E] text-[16px]">
                    LIVENESS SCORE
                  </span>
                  <span className="text-black text-[16px] font-medium">
                    {extractedData["probability "]}
                  </span>
                </div>

                <div className="flex gap-x-2 items-center">
                  <span className="text-[#7E7E7E] text-[16px]">
                    LIVENESS RESULT
                  </span>
                  <span
                    className={`${
                      extractedData["liveness result "] === "Image is genuine"
                        ? "text-[#43A047]"
                        : "text-primary"
                    }  text-[16px] font-medium`}
                  >
                    {
                      extractedData["liveness result "]
                      // === "Image is genuine"
                      //   ? "Image is genuine"
                      //   : extractedData["liveness result "]
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[673px] flex items-center justify-center rounded-t-[14px] bg-white">
            <p className="text-[#5B5B5B] text-lg">
              No extracted data available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FaceLiveDetectionResultBox;
