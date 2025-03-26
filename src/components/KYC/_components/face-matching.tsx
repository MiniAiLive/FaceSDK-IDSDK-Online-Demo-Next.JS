import Image from "next/image";
import React from "react";
import { FaEquals, FaNotEqual } from "react-icons/fa6";
const LOCAL_STORAGE_KEY = "kycFaceMatchingData";
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
const FaceMatchingResultForKyc = () => {
  const savedFaceMatchData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedFaceMatchData: FaceDetectionResultProps = JSON.parse(
    savedFaceMatchData!
  );
  return (
    <section className="mt-4">
      {parsedFaceMatchData?.match.slice(0, 1)?.map((match, index) => {
        const similarity = Number((match.similarity * 100).toFixed(2));

        // const firstFace = detections[match.firstFaceIndex];
        // const secondFace = detections[match.secondFaceIndex];
        const firstFace = parsedFaceMatchData.detections.find(
          (detection) => detection.firstFaceIndex === match.firstFaceIndex
        );
        const secondFace = parsedFaceMatchData.detections.find(
          (detection) => detection.secondFaceIndex === match.secondFaceIndex
        );
        console.log("firstFace", firstFace);
        console.log("secondFace", secondFace);
        return (
          <div
            key={`${match.firstFaceIndex}-${match.secondFaceIndex}-${index}`}
            className="w-full flex flex-col items-center gap-4 rounded-t-[14px] bg-white"
          >
            {/* Images and Comparison Icon */}
            <div className="flex items-center gap-4">
              <Image
                src={`data:image/jpeg;base64,${firstFace?.face}`}
                alt={`Reference Image ${match.firstFaceIndex + 1}`}
                width={100}
                height={100}
                className="h-[130px] w-[120px] md:w-[130px] rounded-[20px]"
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
    </section>
  );
};

export default FaceMatchingResultForKyc;
