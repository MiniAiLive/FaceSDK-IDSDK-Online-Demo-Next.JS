import CompareImageUploader from "@/components/CompareImageUploader";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React, { FC, useState } from "react";

import image_1 from "@/assets/face-matching/img1.jpg";
import image_2 from "@/assets/face-matching/img2.jpg";
import image_3 from "@/assets/face-matching/img3.jpg";
import image_4 from "@/assets/face-matching/img4.jpg";
import image_5 from "@/assets/face-matching/img5.jpg";
import image_6 from "@/assets/face-matching/img6.jpg";
import { toast } from "react-toastify";
import { FACE_BASE_URL } from "@/lib/utils";
import KycRadioTik from "@/components/svg/kyc-radio-tik";
import KycRadio from "@/components/svg/kyc-radio";
interface KYCFormProps {
  router: AppRouterInstance;
}
const LOCAL_STORAGE_KEY = "kycFaceMatchingData";
const previewImages = [image_1, image_2, image_3];
const previewImages_2 = [image_4, image_5, image_6];

const FaceMatchingKYC: FC<KYCFormProps> = ({ router }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [results, setResults] = useState<FaceDetectionResultProps>();
  const [images, setImages] = useState<Record<string, string | null>>({
    front: null,
    back: null,
  });

  const handleSubmit = async () => {
    setLoading(true);

    // Validate first image
    if (!images.front) {
      toast.error("Please input the front image. noImageError1");
      setLoading(false);
      return;
    }

    // Validate second image
    if (!images.back) {
      toast.error("Please input the back image. noImageError2");
      setLoading(false);
      return;
    }

    try {
      // Convert uploaded images to files
      const file1 = await dataURLtoFile(images.front, "image1.jpg");
      const file2 = await dataURLtoFile(images.back, "image2.jpg");

      if (!file1 || !file2) {
        setLoading(false);
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);

      // Submit to API
      const response = await fetch(`${FACE_BASE_URL}/face_match`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      console.log("result", result);
      if (result.face1 === null || result.face2 === null) {
        toast.error("No face detected in one or both images. noFaceDetected");
      } else {
        saveToLocalStorage(result);
        router.push("?license=proof-identity&selfie=selfie");
      }
    } catch (error) {
      console.error("Error submitting images:", error);
      toast.error("Failed to process images. Please try again. submitError");
    } finally {
      setLoading(false);
    }
  };

  // Convert Data URL to File
  const dataURLtoFile = async (
    dataurl: string,
    filename: string
  ): Promise<File | null> => {
    if (dataurl.startsWith("data:")) {
      try {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1];
        if (!mime) throw new Error("Invalid MIME type");

        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);
        for (let i = 0; i < bstr.length; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mime });
      } catch (error) {
        console.error("Error converting data URL to file:", error);
        return null;
      }
    } else {
      // Fallback for other cases
      try {
        const response = await fetch(dataurl);
        const blob = await response.blob();
        return new File([blob], filename);
      } catch (error) {
        console.error("Error fetching file:", error);
        return null;
      }
    }
  };
  // Save data to localStorage on form update
  const saveToLocalStorage = (data: FormData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };
  const handleBack = () => {
    // const currentData = getValues(); // Get current form data
    //saveToLocalStorage(currentData); // Save data before navigating back
    router.back(); // Navigate to the previous page
  };
  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="flex items-center justify-center gap-4 mt-6">
        <KycRadioTik />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <KycRadioTik />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <KycRadio />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
          4
        </div>
      </div>

      {/* Subtitle */}
      <h2 className="text-center text-[16px] font-semibold my-5">
        Face Matching
      </h2>

      {/* image */}
      <div className="lg:flex gap-x-4 lg:h-[500px] lg:w-[725px]">
        <CompareImageUploader
          imageKey="front"
          images={images}
          setImages={setImages}
          previewImages={previewImages}
          className="w-[233px] lg:w-[160px]"
          previewImageClass="w-[101px] h-[64px]"
          showImageHeight="max-h-[220px]"
        />
        <CompareImageUploader
          imageKey="back"
          images={images}
          setImages={setImages}
          previewImages={previewImages_2}
          className="w-[233px] lg:w-[160px]"
          previewImageClass="w-[101px] h-[64px]"
          showImageHeight="max-h-[220px]"
        />
      </div>
      {/* Continue Button */}
      {/* <button
        
        type="submit"
        className="w-full bg-primary text-white rounded-lg px-4 py-2 mt-6 hover:bg-orange-600 transition"
      >
        Continue
      </button> */}
      <div className="flex gap-4 mt-4 lg:w-[725px]">
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

export default FaceMatchingKYC;
