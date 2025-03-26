"use client";

import face_1 from "@/assets/face-liveness-detection/img1.png";
import face_2 from "@/assets/face-liveness-detection/img2.jpg";
import face_3 from "@/assets/face-liveness-detection/img3.jpg";
import face_4 from "@/assets/face-liveness-detection/img4.jpg";
import face_5 from "@/assets/face-liveness-detection/img5.jpg";
import face_6 from "@/assets/face-liveness-detection/img6.jpg";
// import FaceDetectionResultBox from "./Face-SDK/FaceDetectionResultBox";
import FaceLiveDetectionResultBox from "./Face-Live_detection/FaceLiveDetectionResult";
import { toast } from "react-toastify";
import LoadingPage from "./Loader";
import { FACE_LIVE_BASE_URL } from "@/lib/utils";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { Button } from "./ui/button";

type ExtractedData = {
  "liveness result ": string;
  "probability ": number;
  quality: number;
  "score ": number;
  state: string;
};

const previewImages = [face_1, face_2, face_3, face_4, face_5, face_6];

const FaceLiveDetection = () => {
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [faceImage, setFaceImage] = useState<string>("");

  const sendImageToApi = async (file: Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${FACE_LIVE_BASE_URL}/check_liveness`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (
        data["state "] !== "OK" ||
        data["liveness result "] === "Image is spoofed"
      ) {
        toast.error(
          data["state "] !== "OK" ? data["state "] : data["liveness result "]
        );
      }
      if (!!data) {
        setFaceImage(uploadedImage);
      }
      setExtractedData(data);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const file = uploadedImage;

    if (!file) {
      const existingToastId = toast.isActive("noImageError");

      if (!existingToastId) {
        toast.error("Please upload an image.", {
          toastId: "noImageError",
          style: {
            width: "auto",
            backgroundColor: "#FFFFFF",
            color: "#FF6347",
          },
        });
      }
      return;
    }

    if (file) {
      fetch(file)
        .then((res) => res.blob())
        .then((blob) => sendImageToApi(blob))
        .catch((err) => console.error("Error fetching the image:", err));
    }
  };

  console.log(extractedData);
  console.log(faceImage);

  return (
    <div className="lg:flex lg:max-w-[1520px] lg:gap-x-6 mr-2 pl-2">
      <div className="w-full lg:w-1/2 h-full">
        <ImageUploader
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
          previewImages={previewImages}
          className="w-56"
          previewImageClass="w-[102px] h-[102px]"
        />
        {/* <div className="text-center text-gray-500 px-6">
          &quot;We offer advanced security solutions with facial recognition,
          liveness detection, and ID document recognition, seamlessly
          integrating with your existing systems.&quot;
        </div> */}
        <div className="flex justify-center mt-10">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="miniai"
            className="px-4 h-[43px] rounded-full"
          >
            {loading ? "Processing..." : "Check Liveness Result"}
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full">
        {loading ? (
          <LoadingPage />
        ) : (
          // <FaceLiveDetectionResultBox extractedData={extractedData} />
          <FaceLiveDetectionResultBox
            extractedData={extractedData}
            faceImage={faceImage}
          />
        )}
      </div>
    </div>
  );
};

export default FaceLiveDetection;
