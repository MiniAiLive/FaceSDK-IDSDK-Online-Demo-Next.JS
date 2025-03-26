import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";

type FaceDetectionResult = {
  attributes: Record<string, string | string[]>;
  face: string; // Assuming base64 image data
  landmarks: [number, number][];
  position: [number, number, number, number]; // [x, y, width, height]
  rotationAngle: number;
};

type FaceDetectionResultBoxProps = {
  results: FaceDetectionResult[] | null;
};

const FaceDetectionResultBox: React.FC<FaceDetectionResultBoxProps> = ({
  results,
}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const toggleConditionalText = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };
  // const resultArray = Object.values(results);
  const resultArray =
    results && typeof results === "object" ? Object.values(results) : [];

  const renderAttributes = (attributes: Record<string, string | string[]>) => {
    console.log("attributes", attributes);
    // Keys to remove
    const keysToRemove = [
      "Emotion",
      "ForeheadCovering",
      "HeadCovering",
      "Occlusion",
      "StrongMakeup",
    ];

    // Filter out the keys
    const filteredAttributes = Object.fromEntries(
      Object.entries(attributes).filter(([key]) => !keysToRemove.includes(key))
    );

    return Object.entries(filteredAttributes).map(([key, value]) => (
      <ul
        key={key}
        className="flex justify-between space-y-3 text-[16px] font-normal text-[#7E7E7E]"
      >
        <li>{key}</li>
        <li>{Array.isArray(value) ? value.join(", ") : value}</li>
      </ul>
    ));
  };

  return (
    <div className="w-full h-[734px] px-4 pt-4 rounded-t-[20px] bg-[#F5F8FF] mt-5 lg:mt-0">
      <h2 className="text-black text-[24px] font-medium mb-2">Result</h2>
      {resultArray?.length > 0 ? (
        <div className="w-full h-[700px] overflow-y-auto scrollBarThin flex justify-center rounded-[14px]">
          <Accordion type="single" collapsible className="w-full">
            {resultArray?.map((result, index) => (
              <AccordionItem key={index} value={`result-${index}`}>
                <AccordionTrigger
                  onClick={() => toggleConditionalText(`result-${index}`)}
                  className="h-[111px]"
                >
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={`data:image/jpeg;base64,${result.face}`}
                      alt={`Face thumbnail ${index + 1}`}
                      width={108}
                      height={108}
                      className="h-[108px] w-[108px] rounded-[20px]"
                    />
                    <div>
                      <div className="flex gap-x-2">
                        <h1 className="text-[16px] text-[#7E7E7E] font-normal">
                          AGE
                        </h1>
                        <p className="text-[16px] text-black font-medium">
                          {Array.isArray(result.attributes.Age)
                            ? result.attributes.Age.join(" - ")
                            : result.attributes.Age}{" "}
                          years old
                        </p>
                      </div>
                      <div className="flex pt-2">
                        <h1 className="text-sm text-primary font-normal underline">
                          {expandedItem === `result-${index}`
                            ? "Close"
                            : "Show all attributes"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border rounded-[20px] py-3 px-4">
                  {renderAttributes(result.attributes)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center rounded-t-[14px] bg-white overflow-hidden h-[675px]">
          <p className="text-[#5B5B5B] text-lg">No extracted data available.</p>
        </div>
      )}
    </div>
  );
};

export default FaceDetectionResultBox;
