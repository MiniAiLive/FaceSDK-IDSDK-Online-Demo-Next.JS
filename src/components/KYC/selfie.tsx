import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import KycRadioTik from "../svg/kyc-radio-tik";
import KycRadio from "../svg/kyc-radio";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import {
  DATABASE_NAME,
  FACE_BASE_URL,
  FACE_LIVE_BASE_URL,
  STORE_NAME,
} from "@/lib/utils";

import { openDB } from "idb";

// const LOCAL_STORAGE_KEY = "kycSelfieData";
const LOCAL_LICENSE_STORAGE_KEY = "kycLicenseData";
const LOCAL_PASSPORT_STORAGE_KEY = "kycPassportData";
const LOCAL_FACE_MATCH_STORAGE_KEY = "kycFaceMatchingData";

const Selfie = () => {
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const router = useRouter();
  console.log("uploadedImage", uploadedImage);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image.", { toastId: "noImageError" });
      return;
    }

    try {
      const imageBlob = await fetch(uploadedImage).then((res) => res.blob());
      await checkLiveness(imageBlob);
    } catch (error) {
      console.error("Error processing the image:", error);
      toast.error("Failed to process the uploaded image.");
    }
  };

  const checkLiveness = async (image: Blob) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(`${FACE_LIVE_BASE_URL}/check_liveness`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error(`Liveness API Error: ${response.status}`);

      const livenessData = await response.json();
      livenessData.face = uploadedImage;

      const referenceImage = getReferenceImage();
      if (referenceImage) {
        await runFaceMatch(uploadedImage, referenceImage);
        saveToLocalStorage(livenessData);
      } else {
        toast.error("No reference image found for face matching.");
      }
    } catch (error) {
      console.error("Error during liveness check:", error);
      toast.error("Liveness check failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const runFaceMatch = async (image1: string, image2: string) => {
    console.log("image2", image2);
    try {
      if (!image1 || !image2) {
        toast.error("Both images are required for face matching.");
        return;
      }

      const [file1, file2] = await Promise.all([
        dataURLtoFile(image1, "image1.jpg"),
        dataURLtoFile(image2, "image2.jpg"),
      ]);

      if (!file1 || !file2) {
        console.log("file1", file1);
        console.log("file2", file2);
        toast.error("Failed to prepare images for face matching.");
        return;
      }

      const formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);

      const response = await fetch(`${FACE_BASE_URL}/face_match`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error(`Face Match API Error: ${response.status}`);

      const result = await response.json();

      if (result.face1 === null || result.face2 === null) {
        toast.error("No face detected in one or both images.");
      } else {
        saveToLocalStorageForFaceMatch(result);
        handleClick();
        // router.push("/success"); // Redirect on success
      }
    } catch (error) {
      console.error("Error during face matching:", error);
      toast.error("Face matching failed. Please try again.");
    }
  };

  const getReferenceImage = (): string | null => {
    const licenseData = JSON.parse(
      localStorage.getItem(LOCAL_LICENSE_STORAGE_KEY) || "null"
    );
    const passportData = JSON.parse(
      localStorage.getItem(LOCAL_PASSPORT_STORAGE_KEY) || "null"
    );
    return licenseData?.[0]?.Images?.["Portrait-V"]?.image
      ? `data:image/jpeg;base64,${licenseData?.[0]?.Images?.["Portrait-V"]?.image}`
      : `data:image/jpeg;base64,${passportData?.Images?.["Portrait-V"]?.image}`;
  };

  const dataURLtoFile = async (
    dataurl: string,
    filename: string
  ): Promise<File | null> => {
    try {
      const [header, base64] = dataurl.split(",");
      const mimeMatch = header.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "";

      const binary = atob(base64);
      const arrayBuffer = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        arrayBuffer[i] = binary.charCodeAt(i);
      }

      return new File([arrayBuffer], filename, { type: mime });
    } catch (error) {
      console.error("Error converting data URL to file:", error);
      return null;
    }
  };

  const saveToLocalStorage = async (data: unknown) => {
    const db = await openDB(DATABASE_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });

    await db.put(STORE_NAME, JSON.stringify(data), "currentData");
  };

  const saveToLocalStorageForFaceMatch = (data: unknown) => {
    localStorage.setItem(LOCAL_FACE_MATCH_STORAGE_KEY, JSON.stringify(data));
  };
  const handleClick = () => {
    const query = new URLSearchParams({
      license: "proof-identity",
      selfie: "selfie",
      result: "result",
    }).toString();
    if (router) {
      router.push(`?${query}`);
    }
  };
  const handleBack = () => {
    // const currentData = getValues(); // Get current form data
    //saveToLocalStorage(currentData); // Save data before navigating back
    router.back(); // Navigate to the previous page
  };
  return (
    <div className="lg:w-6/12 mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <KycRadioTik />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <KycRadioTik />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <KycRadio />
      </div>

      {/* Subtitle */}
      <h2 className="text-center text-[16px] font-semibold my-5">
        Upload a selfie photo
      </h2>

      {/* image */}
      <div className="flex mx-auto lg:h-[500px] lg:w-[450px]">
        <ImageUploader
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
          // previewImages={previewImages}
          className="w-[180px]"
          previewImageClass="w-[75px] h-[75px]"
          showImageHeight="max-h-[220px]"
        />
      </div>
      {/* Continue Button */}
      {/* <div className="lg:w-[450px] mx-auto">
        <button
          onClick={handleClick}
          type="submit"
          className="w-full bg-primary text-white rounded-lg px-4 py-2 mt-6 hover:bg-orange-600 transition"
        >
          Continue
        </button>
      </div> */}
      <div className="flex gap-4 mt-4 lg:w-[450px] mx-auto">
        <button
          type="button"
          onClick={handleBack}
          className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="w-full bg-primary text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Selfie;
