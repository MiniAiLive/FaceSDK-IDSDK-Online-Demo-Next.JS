"use client";
import ImageUploader from "./ImageUploader";
import face1 from "@/assets/face-detection/img1.jpg";
import face2 from "@/assets/face-detection/img2.jpg";
import face3 from "@/assets/face-detection/img3.jpg";
import face4 from "@/assets/face-detection/img4.jpg";
import FaceDetectionResultBox from "./Face-SDK/FaceDetectionResultBox";
import { useState } from "react";
import { toast } from "react-toastify";
import { FACE_BASE_URL } from "@/lib/utils";
import LoadingPage from "./Loader";
import { Button } from "./ui/button";

const previewImages = [face1, face2, face3, face4];
type FaceDetectionResult = {
  attributes: Record<string, string | string[]>;
  face: string; // Assuming base64 image data
  landmarks: [number, number][];
  position: [number, number, number, number]; // [x, y, width, height]
  rotationAngle: number;
};
const FaceDetection = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [results, setResults] = useState<FaceDetectionResult[] | null>(null);
  // const [livenessImage, setLivenessImage] = useState(null);

  const dataURLtoFile = async (dataurl: string, filename: string) => {
    console.log("dataurl", dataurl);
    try {
      let blob;

      if (dataurl?.startsWith("data:")) {
        const arr = dataurl?.split(",");
        if (arr.length < 2) {
          throw new Error("Invalid data URL format");
        }

        const mime = arr[0].match(/:(.*?);/);
        if (!mime || !mime[1]) {
          throw new Error("Invalid MIME type in data URL");
        }

        const type = mime[1];
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        blob = new Blob([u8arr], { type });
      } else {
        console.log("dataurl", dataurl);
        const response = await fetch(dataurl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data URL: ${response.status} ${response.statusText}`
          );
        }
        blob = await response.blob();
      }

      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("Error converting data URL to file:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    try {
      const file = await dataURLtoFile(uploadedImage, "image.jpg");
      if (!file) {
        const existingToastId = toast.isActive("noImageError");
        if (!existingToastId) {
          toast.error("Please upload an image.", {
            toastId: "noImageError",
            style: {
              backgroundColor: "#FF6347",
              color: "#FFFFFF",
            },
          });
        }
        setLoading(false);
        return;
      }

      // setLivenessImage(uploadedImage);
      formData.append("file", file);

      const response = await fetch(`${FACE_BASE_URL}/face_detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResults(result?.detections);

      // setLivenessImage(uploadedImage);
    } catch (error) {
      console.error("Error submitting image:", error);
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
    } finally {
      setLoading(false);
      // setUploadedImage(null);
    }
  };
  // console.log("results", results?.detections);
  return (
    <div className="flex flex-col lg:flex-row lg:max-w-[1520px] lg:gap-x-4 mr-2 pl-2  ">
      <div className="w-full lg:w-1/2 h-full">
        <ImageUploader
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
          previewImages={previewImages}
          className="w-56"
        />
        {/* <div className="text-center text-gray-500 px-6">
          We offer advanced security solutions with facial recognition, liveness
          detection, and ID document recognition, seamlessly integrating with
          your existing systems.
        </div> */}
        <div className="flex justify-center mt-10">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant="miniai"
            className=""
          >
            {loading ? "Processing..." : "Detect"}
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full">
        {loading ? (
          <LoadingPage />
        ) : (
          <FaceDetectionResultBox results={results} />
        )}
      </div>
    </div>
  );
};

export default FaceDetection;
