import Image from "next/image";
import React from "react";

type ExtractedImages = {
  Document?: {
    image: string;
  };
  "Ghost portrait"?: {
    image?: string;
  };
  "Portrait-V"?: {
    image?: string;
    Position?: {
      x1?: number;
      x2?: number;
      y1?: number;
      y2?: number;
    };
  };
  Signature?: {
    image?: string;
  };
} | null;

type ImageExtracted = {
  extractedImages: ExtractedImages;
};

type ExtractedItemProps = {
  label: string;
  image: string;
};

const ExtractedItem: React.FC<ExtractedItemProps> = ({ label, image }) => (
  <div className="h-[154px] p-2 border-b flex text-center items-center justify-between lg:justify-normal">
    <p className="w-4/12 text-[24px] font-medium">{label}</p>
    <div className="max-w-6/12 h-full ml-3 flex justify-center items-center">
      <Image
        className="max-h-full  max-w-full object-fill  rounded-lg"
        src={`data:image/jpeg;base64,${image}`}
        alt={label}
        width={245}
        height={137}
      />
    </div>
  </div>
);

const ImageExtractResult: React.FC<ImageExtracted> = ({ extractedImages }) => {
  if (!extractedImages) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-[14px]">
        <p className="text-[#5B5B5B] text-[16px]">
          No extracted images available.
        </p>
      </div>
    );
  }

  // Convert the extractedImages object into an array of items to render
  const extractedData = Object.entries(extractedImages)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value && value.image) // Ensure images exist
    .map(([key, value]) => ({
      label: key,
      image: value?.image || "",
    }));

  return (
    <div className="bg-white p-3 rounded-t-[20px] h-[610px] overflow-y-auto scrollBarThin">
      {extractedData.length > 0 ? (
        <div className="border rounded-[20px]">
          {extractedData.map((data, index) => (
            <ExtractedItem key={index} label={data.label} image={data.image} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-[14px]">
          <p className="text-[#5B5B5B] text-[16px]">
            No extracted data available.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageExtractResult;
