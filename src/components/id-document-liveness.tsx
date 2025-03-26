"use client";

import ImageUploader from "@/components/ImageUploader";
import IdDocumentLivenessResult from "./Id-SDK/id-document-liveness";
import { toast } from "react-toastify";
import { useState } from "react";
import face_1 from "@/assets/id-document-liveness/img1.png";
import face_2 from "@/assets/id-document-liveness/img2.jpg";
import face_3 from "@/assets/id-document-liveness/img3.png";
// import face_4 from "@/assets/id-document-liveness/img3.png";
import LoadingPage from "./Loader";
import { ID_LIVE_BASE_URL } from "@/lib/utils";
import { Button } from "./ui/button";

type LivenessResult = {
  attack_method: string;
  liveness_probability: number;
  liveness_score: number;
  quality_score: number;
  state: string;
};

const previewImages = [face_1, face_2, face_3];

const IdDocumentLiveness = () => {
  const [extractedData, setExtractedData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const sendImageToApi = async (file: Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${ID_LIVE_BASE_URL}/check_id_liveness`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);
      const sanitizedData = data.map((item: { [x: string]: undefined }) => {
        const cleanedItem: Partial<LivenessResult> = {};
        Object.keys(item).forEach((key) => {
          const trimmedKey = key.trim() as keyof LivenessResult;
          cleanedItem[trimmedKey] = item[key as keyof typeof item];
        });
        return cleanedItem as LivenessResult;
      });
      setExtractedData(sanitizedData);
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

  return (
    <section className="lg:max-w-[1520px] gap-x-6 mr-2 pl-2">
      <div className="invisible">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quae,
        qui dignissimos adipisci ratione, est laborum mollitia magnam nam
        expedita dolores nemo tenetur illo? Quis sapiente minima laboriosam
        aperiam placeat.
      </div>
      <div>
        <h1 className="text-center text-[28px] lg:text-[36px] font-medium text-black -mt-10">
          ID Document Liveness
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-3 justify-between bg-white/5 pt-3">
        {/* Image Uploaders */}
        <div className="flex flex-col  w-full lg:w-1/2">
          <ImageUploader
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            previewImages={previewImages}
            className="w-[233px]"
          />

          {/* <div className="text-center text-gray-500 px-6">
            Experience MiniAiLive&apos;s iBeta (Level 2) Certified, Single-Image
            Based Face Liveness Detection (Face Anti Spoofing) Engine today.
          </div> */}
          <div className="flex justify-center mt-10">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="miniai"
              className="px-4 h-[44px] rounded-full"
            >
              {loading ? "Processing..." : "Check Liveness Result"}
            </Button>
          </div>
        </div>

        {/* Result Box */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          {loading ? (
            <LoadingPage />
          ) : (
            <IdDocumentLivenessResult extractedData={extractedData} />
          )}
        </div>
      </div>
    </section>
  );
};

export default IdDocumentLiveness;
