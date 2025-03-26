"use client";

import FaceMatchingResultBox from "./Face-SDK/FaceMatchingResultBox";
import image_1 from "@/assets/face-matching/img1.jpg";
import image_2 from "@/assets/face-matching/img2.jpg";
import image_3 from "@/assets/face-matching/img3.jpg";
// import image_4 from "@/assets/face-matching/image-3.png";
import image_5 from "@/assets/face-matching/img4.jpg";
import image_6 from "@/assets/face-matching/img5.jpg";
import image_7 from "@/assets/face-matching/img6.jpg";
import { toast } from "react-toastify";
import { useState } from "react";
import { FACE_BASE_URL } from "@/lib/utils";
import CompareImageUploader from "./CompareImageUploader";
import LoadingPage from "./Loader";

const previewImages = [image_1, image_2, image_3];
const previewImages_2 = [image_7, image_5, image_6];
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
const FaceMatching = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Record<string, string | null>>({
    reference: null,
    compare: null,
  });
  const [results, setResults] = useState<FaceDetectionResultProps>();
  // const [livenessImage, setLivenessImage] = useState(null);
  const handleSubmit = async () => {
    setLoading(true);

    // Validate first image
    if (!images.reference) {
      toast.error("Please input the reference image. noImageError1");
      setLoading(false);
      return;
    }

    // Validate second image
    if (!images.compare) {
      toast.error("Please input the compare image. noImageError2");
      setLoading(false);
      return;
    }

    try {
      // Convert uploaded images to files
      const file1 = await dataURLtoFile(images.reference, "image1.jpg");
      const file2 = await dataURLtoFile(images.compare, "image2.jpg");
      console.log("file1", file1);
      console.log("file2", file2);
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

      if (result.face1 === null || result.face2 === null) {
        toast.error("No face detected in one or both images. noFaceDetected");
      } else {
        //setResults(Object.values(result) as FaceDetectionResultProps[]);
        setResults(result);
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
  return (
    <section className="lg:max-w-[1520px]  mr-2 pl-2">
      <div>
        <h1 className="text-center text-[28px] lg:text-[36px] font-medium text-black mt-2">
          Face Matching
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:gap-x-5 bg-white/5 pt-3">
        {/* Image Uploaders */}
        <div className="flex flex-col w-full lg:w-7/12">
          <div className="flex flex-col lg:flex-row gap-x-4">
            <div className="w-full lg:w-1/2">
              <h1 className="text-center text-black text-[20px] lg:text-[24px] mb-3">
                Reference
              </h1>
              <CompareImageUploader
                imageKey="reference"
                images={images}
                setImages={setImages}
                previewImages={previewImages}
                className="w-[233px] lg:w-[160px]"
                previewImageClass="w-[105px] h-[90px]"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-center text-black text-[20px] lg:text-[24px] mb-3">
                Compare
              </h1>
              <CompareImageUploader
                imageKey="compare"
                images={images}
                setImages={setImages}
                previewImages={previewImages_2}
                className="w-[233px] lg:w-[160px]"
                previewImageClass="w-[105px] h-[90px]"
              />
            </div>
          </div>
          {/* <div className="text-center text-gray-500 px-6">
            We offer advanced security solutions with facial recognition,
            liveness detection, and ID document recognition, seamlessly
            integrating with your existing systems.
          </div> */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              className="w-[244.5px] h-[48px] bg-primary text-white text-lg rounded-full font-bold hover:bg-primary mb-5"
            >
              {loading ? "Processing..." : "Matching"}
            </button>
            {/* <Button onClick={handleSubmit} variant="miniai">
              {loading ? "Processing..." : "Matching"}
            </Button> */}
          </div>
        </div>

        {/* Result Box */}
        <div className="w-full lg:w-5/12 mt-6 lg:mt-0">
          {loading ? (
            <LoadingPage />
          ) : (
            <FaceMatchingResultBox
              detections={results?.detections || []}
              match={results?.match || []}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FaceMatching;
