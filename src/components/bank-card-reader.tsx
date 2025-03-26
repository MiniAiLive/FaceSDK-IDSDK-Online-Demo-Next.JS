"use client";

import ImageUploader from "@/components/ImageUploader";
import CardReaderResult from "./Id-SDK/bank-card-reader";
import { toast } from "react-toastify";
import { useState } from "react";
import face1 from "@/assets/card/img1.png";
import face2 from "@/assets/card/img2.png";
import face3 from "@/assets/card/img3.png";
import face4 from "@/assets/card/img4.png";
import LoadingPage from "./Loader";
import { ID_BASE_URL } from "@/lib/utils";
import { Button } from "./ui/button";

const previewImages = [face1, face2, face3, face4];

const CardReader = () => {
  const [extractedData, setExtractedData] = useState({});
  const [extractedImages, setExtractedImages] = useState({});

  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const sendImageToApi = async (file: Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${ID_BASE_URL}/check_credit`, {
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
    <section className="w-full lg:max-w-[1520px] gap-x-6 mr-2 pl-2">
      <div className="invisible">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quae,
        qui dignissimos adipisci ratione, est laborum mollitia magnam nam
        expedita dolores nemo tenetur illo? Quis sapiente minima laboriosam
        aperiam placeat.
      </div>

      <div>
        <h1 className="text-center text-[28px] lg:text-[36px] font-medium text-black -mt-10">
          Bank & Credit Card Recognition
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
            previewImageClass="w-[140px] h-[90px]"
          />

          {/* <div className="text-center text-gray-500 px-6">
            Bank & Credit Card OCR (Scan To Pay). World&apos;s fastest and most
            accurate Credit card Scan To Pay implementation.
          </div> */}
          <div className="flex justify-center mt-10">
            <Button disabled={loading} onClick={handleSubmit} variant="miniai">
              {loading ? "Processing..." : "Analysis Card"}
            </Button>
          </div>
        </div>
        {/* Result Box */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          {loading ? (
            <LoadingPage />
          ) : (
            <CardReaderResult
              extractedData={extractedData}
              extractedImages={extractedImages}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CardReader;
