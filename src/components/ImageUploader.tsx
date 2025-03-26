/* eslint-disable @next/next/no-img-element */
"use client";

import Image, { StaticImageData } from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import Webcam from "react-webcam";
import { MdCancel } from "react-icons/md";
import { TbCapture } from "react-icons/tb";
import UploadSvg from "./svg/upload-svg";
import tickMark from "@/assets/tickMark.png";
import TakePhotoSvg from "./svg/take-photo";

interface ImageUploaderProps {
  setUploadedImage: (image: string) => void;
  previewImages?: (StaticImageData | string)[];
  uploadedImage: string | null;
  className: string;
  previewImageClass?: string;

  showImageHeight?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  setUploadedImage,
  uploadedImage,
  previewImages,
  className,
  previewImageClass,
  showImageHeight,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      console.log("event", event);
      if (fileRejections.length > 0) {
        fileRejections.forEach(({ file, errors }) => {
          errors.forEach((e) =>
            console.error(`File ${file.name} rejected: ${e.message}`)
          );
        });
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => setUploadedImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [setUploadedImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setUploadedImage("");
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    setUploadedImage("");
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setUploadedImage(imageSrc);
        setIsCameraOpen(false); // Close camera after capturing
      }
    }
  };

  const handleCancelCamera = () => {
    setIsCameraOpen(false);
    setUploadedImage("");
  };
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      {/* Drag & Drop area */}
      <div
        {...getRootProps()}
        className={`w-full h-[407px] py-10 border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center cursor-pointer ${
          uploadedImage ? "bg-[#FF50001A]" : ""
        } border-primary relative`}
        onClick={handleUploadClick}
      >
        {uploadedImage && (
          <Image
            src={tickMark}
            alt="tickMark"
            className="absolute top-3 right-3 h-7 w-7"
          />
        )}
        <input
          {...getInputProps()}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {uploadedImage || isCameraOpen ? (
          <div
            className={`${
              showImageHeight ? showImageHeight : "max-h-[360px]"
            } flex justify-center items-center h-full  w-full max-w-[85%] mx-auto`}
          >
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="h-full max-w-full object-fill rounded-lg bg-white p-2 border border-primary"
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

      {/* Action buttons */}

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

      {/* Preview images */}
      {!!previewImages?.length && (
        <div className="flex justify-center space-x-2 overflow-hidden w-full h-[130px] py-4 bg-[#F6F9FF]">
          {previewImages?.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Preview ${index}`}
              width={400}
              height={400}
              className={`${
                previewImageClass || "w-[167px] h-[90px]"
              } rounded-[5px] border border-gray-200 cursor-pointer`}
              onClick={() =>
                setUploadedImage(typeof src === "string" ? src : src.src)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader