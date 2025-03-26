import React, { FC, useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import image_1 from "@/assets/lience/image.png";
// import image_2 from "@/assets/lience/image-1.png";
// import image_3 from "@/assets/lience/image-2.png";
import { toast } from "react-toastify";
import { ID_BASE_URL } from "@/lib/utils";
interface KYCFormProps {
  router: AppRouterInstance;
}
const LOCAL_STORAGE_KEY = "kycPassportData";
// const previewImages = [image_1, image_2, image_3];

const Passport: FC<KYCFormProps> = ({ router}) => {
  // const [extractedData, setExtractedData] = useState({});
  // const [extractedImages, setExtractedImages] = useState({});

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
      // setExtractedData(data);
      console.log("data", data);
      saveToLocalStorage(data);
      // setExtractedImages(data.Images);
      router.push("?license=proof-identity&selfie=selfie");
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
  // Save data to localStorage on form update
  const saveToLocalStorage = (data: FormData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className={`lg:w-[450px] lg:flex flex-col gap-x-4 lg:h-[550px] w-full mx-auto`}>
      {/* image */}
      <div className="flex mx-auto lg:h-[500px] lg:w-[450px]">
        <ImageUploader
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
          // previewImages={previewImages}
          className="w-[180px]"
          previewImageClass="w-[102px] h-[64px]"
          showImageHeight="max-h-[220px]"
        />
      </div>
      {/* Continue Button */}
      {/* <div className="lg:w-[450px] mx-auto">

        <button
          onClick={() => router.push("?license=proof-identity&selfie=selfie")}
          type="submit"
          className="w-full bg-primary text-white rounded-lg px-4 py-2 mt-6 hover:bg-orange-600 transition"
        >
          Continue
        </button>
      </div> */}
      <div className="flex gap-4 mt-4">
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

export default Passport;
