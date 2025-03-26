import React from "react";
import { FaNotEqual, FaEquals } from "react-icons/fa6";
import Image from "next/image";

type Detection = {
  face: string; // Base64 image data
  firstFaceIndex?: number; // Optional
  secondFaceIndex?: number; // Optional
  landmarks: [number, number][];
  roi: [number, number, number, number]; // [x, y, width, height]
  rotationAngle: number;
};

type Match = {
  firstFaceIndex: number;
  secondFaceIndex: number;
  similarity: number;
};

type FaceDetectionResultProps = {
  detections: Detection[];
  match: Match[];
};

const FaceMatchingResultBox: React.FC<FaceDetectionResultProps> = ({
  detections,
  match,
}) => {
  return (
    <div className="w-full h-full lg:px-4 pt-4 rounded-t-[20px] bg-[#F5F8FF]">
      <h2 className="text-black text-[24px] font-medium mb-2">Result</h2>

      {detections?.length > 0 && match?.length > 0 ? (
        <div className="flex flex-col gap-3 h-[700px] overflow-y-auto scrollBarThin">
          {match?.map((match, index) => {
            console.log("match", match);
            console.log("detections", detections);
            const similarity = Number((match.similarity * 100).toFixed(2));

            // const firstFace = detections[match.firstFaceIndex];
            // const secondFace = detections[match.secondFaceIndex];
            const firstFace = detections.find(
              (detection) => detection.firstFaceIndex === match.firstFaceIndex
            );
            const secondFace = detections.find(
              (detection) => detection.secondFaceIndex === match.secondFaceIndex
            );
            console.log("firstFace", firstFace);
            console.log("secondFace", secondFace);
            return (
              <div
                key={`${match.firstFaceIndex}-${match.secondFaceIndex}-${index}`}
                className="w-full flex flex-col items-center gap-4 p-4 rounded-t-[14px] bg-white"
              >
                {/* Images and Comparison Icon */}
                <div className="flex items-center gap-4">
                  <Image
                    src={`data:image/jpeg;base64,${firstFace?.face}`}
                    alt={`Reference Image ${match.firstFaceIndex + 1}`}
                    width={100}
                    height={100}
                    className="h-[136px] w-[120px] md:w-[136px] rounded-[20px]"
                  />
                  <div className="flex justify-center items-center">
                    {similarity > 70 ? (
                      <FaEquals className="text-[100px] text-gray-500" />
                    ) : (
                      <FaNotEqual className="text-[100px] text-gray-500" />
                    )}
                  </div>
                  <Image
                    src={`data:image/jpeg;base64,${secondFace?.face}`}
                    alt={`Compared Image ${match.secondFaceIndex + 1}`}
                    width={100}
                    height={100}
                    className="h-[136px] w-[120px] md:w-[136px] rounded-[20px]"
                  />
                </div>

                {/* Similarity Button */}
                <button
                  className={`w-full max-w-[420px] py-2 ${
                    similarity > 70
                      ? "bg-[#43A0471A] text-[#43A047]"
                      : "bg-primary/10 text-primary"
                  } text-[14px] rounded-full font-bold hover:bg-primary/20`}
                >
                  Similarity: {(match.similarity * 100).toFixed(2)}%
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-[720px] flex items-center justify-center rounded-t-[20px] bg-white">
          <p className="text-[#5B5B5B] text-lg">No extracted data available.</p>
        </div>
      )}
    </div>
  );
};

export default FaceMatchingResultBox;
