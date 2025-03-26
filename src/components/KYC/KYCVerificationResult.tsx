import React, { useEffect, useState } from "react";
import ImageSvg from "../svg/image";

import InformationMatching from "./_components/information-matching";
import FaceMatchingSvg from "../svg/face-matching";
import { useRouter } from "next/navigation";
import FaceLivenessSvg from "../svg/face-liveness";
import FaceMatchingResultForKyc from "./_components/face-matching";
import FaceLivenessResultKyc from "./_components/face-liveness-result-kyc";
import { openDB } from "idb";
import { DATABASE_NAME, storageKeys, STORE_NAME } from "@/lib/utils";

type ExtractedData = {
  "liveness result ": string;
  "probability ": number;
  quality: number;
  "score ": number;
  state: string;
  face: string;
};

const KYCVerificationResult: React.FC = () => {
  const router = useRouter();
  const [matchingResult, setMatchingResult] = useState("");
  const [selfieResult, setSelfieResult] = useState<ExtractedData | null>(null);

  const savedFormData = localStorage.getItem(storageKeys.formData);

  const savedLicenseData = localStorage.getItem(storageKeys.licenseData);
  const savedPassportData = localStorage.getItem(storageKeys.passportData);
  const savedFaceMatchData = localStorage.getItem(storageKeys.faceMatchingData);
  // const savedSelfieData = localStorage.getItem(storageKeys.livenessData);
  const parsedFormData = JSON.parse(savedFormData!);
  const parsedLicenseData = JSON.parse(savedLicenseData!);
  const parsedFaceMatchData = JSON.parse(savedFaceMatchData!);
  //JSON.parse(savedSelfieData!);
  const parsedPassportData = JSON.parse(savedPassportData!);
  async function retrieveFromIndexedDB() {
    const db = await openDB(DATABASE_NAME);
    return JSON.parse(await db.get(STORE_NAME, "currentData"));
  }

  useEffect(() => {
    async function fetchSelfieData() {
      try {
        const parsedSelfieData = await retrieveFromIndexedDB();
        console.log("parsedSelfieData in ", parsedSelfieData);
        setSelfieResult(parsedSelfieData);
      } catch (error) {
        console.error("Error retrieving selfie data:", error);
        // Optionally set a default state or error state
        setSelfieResult(null);
      }
    }

    fetchSelfieData();
  }, []);
  // console.log("parsedSelfieDatas ", selfieResult);
  const clearLocalStorage = async () => {
    // Clear localStorage items
    localStorage.removeItem(storageKeys.formData);
    localStorage.removeItem(storageKeys.livenessData);
    localStorage.removeItem(storageKeys.licenseData);
    localStorage.removeItem(storageKeys.faceMatchingData);
    localStorage.removeItem(storageKeys.passportData);

    // Clear IndexedDB
    try {
      const db = await openDB(DATABASE_NAME);
      await db.clear(STORE_NAME); // Clear specific object store
      await db.close(); // Close the database connection

      // Optionally, delete the entire database
      await indexedDB.deleteDatabase(DATABASE_NAME);
    } catch (error) {
      console.error("Error clearing IndexedDB:", error);
    }

    // Navigate to the desired page
    router.push("/open-kyc");
  };
  const similarity = Number(
    (parsedFaceMatchData?.match[0]?.similarity * 100).toFixed(2)
  );
  const selfieSimilarity =
    selfieResult && selfieResult["probability "]
      ? Number((selfieResult["probability "] * 100).toFixed(2))
      : 0;
  console.log("similarity", similarity);
  console.log("selfieSimilarity", selfieSimilarity);
  return (
    <div className="p-2 lg:p-8 bg-white rounded-lg">
      {/* Header Section */}
      <div className="lg:w-[55%] mx-auto">
        <div className="flex justify-evenly items-center mb-6">
          <h2 className="text-xs lg:text-base font-bold">
            KYC Verification Result
          </h2>
          <span
            className={`text-xs lg:text-xl px-6 py-1 rounded-full ${
              similarity > 70 && selfieSimilarity > 70
                ? "bg-[#43A0471A] text-[#43A047]"
                : "bg-[#c260391a] text-primary"
            }`}
          >
            Your Verification was{" "}
            {similarity > 70 && selfieSimilarity > 70 ? "success" : "fail"}
          </span>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center gap-3 mb-7 lg:gap-5 lg:mb-0">
          <div
            className={` ${
              matchingResult === "" || matchingResult === "information"
                ? "border-primary border-b-2"
                : "border-b-2"
            } w-[190px]`}
          >
            <button
              onClick={() => setMatchingResult("information")}
              className={`flex-1 text-center py-2 ${
                matchingResult === "" || matchingResult === "information"
                  ? "text-primary"
                  : "text-[#5B5B5B]"
              } font-medium`}
            >
              <div className="flex items-center justify-center gap-2">
                <ImageSvg
                  fill={
                    matchingResult === "" || matchingResult === "information"
                      ? "#FF5000"
                      : "#5B5B5B"
                  }
                />
                <span>Information matching</span>
              </div>
            </button>
          </div>
          <div
            className={`${
              matchingResult === "face"
                ? "border-primary border-b-2"
                : "border-b-2"
            }`}
          >
            <button
              onClick={() => setMatchingResult("face")}
              className={`flex-1 text-center py-2 ${
                matchingResult === "face" ? "text-primary" : "text-[#5B5B5B]"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FaceMatchingSvg
                  fill={matchingResult === "face" ? "#FF5000" : "#5B5B5B"}
                />
                <span>Face matching</span>
              </div>
            </button>
          </div>
          <div
            className={`${
              matchingResult === "liveness"
                ? "border-primary border-b-2"
                : "border-b-2"
            }`}
          >
            <button
              onClick={() => setMatchingResult("liveness")}
              className={`flex-1 text-center py-2 ${
                matchingResult === "liveness"
                  ? "text-primary"
                  : "text-[#5B5B5B]"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FaceLivenessSvg
                  fill={matchingResult === "liveness" ? "#FF5000" : "#5B5B5B"}
                />
                <span>Face liveness check</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="h-[13.3rem]">
        {(matchingResult === "" || matchingResult === "information") && (
          <InformationMatching
            parsedFormData={parsedFormData}
            parsedLicenseData={parsedLicenseData}
            parsedPassportData={parsedPassportData}
          />
        )}
        {matchingResult === "face" && <FaceMatchingResultForKyc />}
        {matchingResult === "liveness" && (
          <FaceLivenessResultKyc parsedSelfieData={selfieResult!} />
        )}
      </div>

      {/* Button Section */}
      <div className="text-center">
        <button
          onClick={() => clearLocalStorage()}
          className="bg-primary text-white px-12 lg:px-16 py-2 rounded-full hover:bg-primary/90 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default KYCVerificationResult;
