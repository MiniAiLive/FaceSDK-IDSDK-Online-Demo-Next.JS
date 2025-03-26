"use client";

import ImageUploader from "@/components/ImageUploader";
import face1 from "@/assets/id-document-recognition/img1.png";
import face2 from "@/assets/id-document-recognition/img2.png";
import face3 from "@/assets/id-document-recognition/img3.png";
import face4 from "@/assets/id-document-recognition/img4.png";
import IdRecognitionResult from "./Id-SDK/id-recognition";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingPage from "./Loader";
import { ID_BASE_URL } from "@/lib/utils";
import { Button } from "./ui/button";

const previewImages = [face1, face2, face3, face4];

const IdRecognition = () => {
  const [extractedData, setExtractedData] = useState({});
  const [extractedImages, setExtractedImages] = useState({});

  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const sendImageToApi = async (file: Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${ID_BASE_URL}/check_id`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setExtractedData(data);
      setExtractedImages(data.Images);
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
      <div>
        <h1 className="text-center text-[28px] lg:text-[36px] font-medium text-black mt-2">
          ID Document Recognition
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-x-3 justify-between pt-5">
        {/* Image Uploaders */}
        <div className="flex flex-col  w-full lg:w-1/2">
          <ImageUploader
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            previewImages={previewImages}
            className="w-[233px]"
            previewImageClass="w-[140px] h-[90px]"
          />

          {/* <div className="text-center text-gray-500 px-6">
            We offer advanced security solutions with facial recognition,
            liveness detection, and ID document recognition, seamlessly
            integrating with your existing systems.
          </div> */}
          <div className="flex justify-center mt-10">
            <Button disabled={loading} onClick={handleSubmit} variant="miniai">
              {loading ? "Processing..." : "Analysis Document"}
            </Button>
          </div>
        </div>

        {/* Result Box */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          {loading ? (
            <LoadingPage />
          ) : (
            <IdRecognitionResult
              extractedData={extractedData}
              extractedImages={extractedImages}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default IdRecognition;
