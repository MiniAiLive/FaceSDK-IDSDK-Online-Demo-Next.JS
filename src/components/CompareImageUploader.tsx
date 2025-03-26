/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import UploadSvg from "./svg/upload-svg";
import tickMark from "@/assets/tickMark.png";
import TakePhotoSvg from "./svg/take-photo";
import Webcam from "react-webcam";
import { MdCancel } from "react-icons/md";
import { TbCapture } from "react-icons/tb";

interface ImageUploaderProps {
  imageKey: string; // Unique identifier for each uploader
  images: Record<string, string | null>; // Object to store images
  setImages: (images: Record<string, string | null>) => void; // Function to update images
  previewImages?: StaticImageData[];
  className: string;
  previewImageClass?: string;
  showImageHeight?: string;
}

const CompareImageUploader: React.FC<ImageUploaderProps> = ({
  imageKey,
  images,
  setImages,
  previewImages,
  className,
  previewImageClass,
  showImageHeight,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      console.log("Dropped files:", acceptedFiles);
      console.log("event:", event);

      // Handle rejected files
      if (fileRejections.length > 0) {
        fileRejections.forEach(({ file, errors }) => {
          errors.forEach((e) => {
            console.error(`File ${file.name} was rejected: ${e.message}`);
          });
        });
        return;
      }

      // Process accepted files
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (file instanceof File) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImages({
              ...images,
              [imageKey]: reader.result as unknown as string,
            });
          };

          reader.readAsDataURL(file);
        } else {
          console.error("Dropped item is not a valid file");
        }
      } else {
        console.error("No files dropped");
      }
    },
    [images, setImages, imageKey]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Accept all image types
  });

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    setImages({
      reference: null,
      compare: null,
    });
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImages({
          ...images,
          [imageKey]: imageSrc as unknown as string,
        });
        setIsCameraOpen(false); // Close camera after capturing
      }
    }
  };

  const handleCancelCamera = () => {
    setIsCameraOpen(false);
    setImages({
      reference: null,
      compare: null,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className={`w-full h-[407px] py-10 border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center cursor-pointer ${
          !!images?.[imageKey] && "bg-[#FF50001A]"
        } border-primary relative`}
        onClick={handleUploadClick}
      >
        {images?.[imageKey] && (
          <Image
            src={tickMark}
            alt="tickMark"
            className="absolute top-2 right-2 h-7 w-7"
          />
        )}
        <input
          {...getInputProps()}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {images?.[imageKey] || isCameraOpen ? (
          <div
            className={`${
              showImageHeight ? showImageHeight : "max-h-[360px]"
            } flex justify-center items-center h-full w-full max-w-[85%] mx-auto`}
          >
            {images?.[imageKey] && (
              <img
                src={images?.[imageKey] as string}
                alt="Uploaded"
                className="h-full  max-w-full object-fill  rounded-lg bg-white p-2 border border-primary"
              />
            )}
            {isCameraOpen && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="max-h-full max-w-full object-fill rounded-lg bg-white p-2 border border-primary"
              />
            )}
          </div>
        ) : (
          <>
            <UploadSvg height="72" width="73" />
            <p className="text-primary font-bold text-[16px] font-[DM Sans]">
              Drag & Drop Image
            </p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {!isCameraOpen && (
        <div className="space-y-5 lg:space-y-0 lg:flex lg:space-x-3">
          <button
            className={`flex justify-center items-center space-x-1 py-2 border rounded-full border-primary text-primary hover:bg-transparent ${className}`}
            onClick={handleUploadClick}
          >
            <UploadSvg height="24" width="24" />
            <span className="text-[16px] font-normal">Upload a photo</span>
          </button>

          <button
            className={`flex justify-center items-center space-x-1 py-2 border rounded-full border-primary text-primary hover:bg-transparent ${className}`}
            onClick={openCamera}
          >
            <TakePhotoSvg />
            <span className="text-[16px] font-normal">Take a Photo</span>
          </button>
        </div>
      )}
      {isCameraOpen && (
        <div className="space-y-5 lg:space-y-0 lg:flex lg:space-x-3">
          <button
            className={`flex justify-center items-center space-x-1 py-2 border rounded-full border-primary text-primary hover:bg-transparent ${className}`}
            onClick={handleCancelCamera}
          >
            <MdCancel className="h-5 w-5" />
            <span className="text-[16px] font-normal">Cancel</span>
          </button>

          <button
            className={`flex justify-center items-center space-x-1 py-2 border rounded-full border-primary text-primary hover:bg-transparent ${className}`}
            onClick={capturePhoto}
          >
            <TbCapture className="h-5 w-5" />
            <span className="text-[16px] font-normal">Capture photo</span>
          </button>
        </div>
      )}
      {/* Preview Images */}
      {previewImages?.length && (
        <div className="flex justify-center space-x-1 overflow-hidden w-full h-[130px] py-4 bg-[#F6F9FF] cursor-pointer">
          {previewImages?.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Preview ${index}`}
              width={400}
              height={400}
              className={`${
                previewImageClass ? previewImageClass : "w-[167px] h-[90px]"
              } object-cover rounded-[5px] border border-gray-200 cursor-pointer"`}
              onClick={() =>
                setImages({
                  ...images,
                  [imageKey]: src.src as unknown as string,
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompareImageUploader;
