import React from "react";

type ExtractedData = {
  [key: string]: string | object | undefined; // Allow string, object, or undefined values
};

type TextExtracted = {
  extractedData: ExtractedData;
};

const TextExtractResult: React.FC<TextExtracted> = ({ extractedData }) => {
  // List of allowed keys
  const allowedKeys = [
    "Address",
    "Address City",
    "Address Jurisdiction Code",
    "Address Postal Code",
    "Address State",
    "Address Street",
    "Age",
    "Age at Issue",
    "DL Class",
    "DL Endorsed",
    "DL Restriction Code",
    "Date of Birth",
    "Date of Expiry",
    "Date of Issue",
    "Document Discriminator",
    "Document Name",
    "Document Number",
    "Eyes Color",
    "Full Name",
    "Given Names",
    "Hair Color",
    "Height",
    "Issuing State Code",
    "Issuing State Name",
    "RemainderTerm",
    "Sex",
    "Surname",
    "Years Since Issue",
    "Bank Card Number",
    "Bank Card Validity",
    "Category",
    "Full Name",
    "Document Class Code",
    "MRZ Type",
    "Personal Number",
  ];

  // Filter data to include only allowed keys
  const attributes = Object.entries(extractedData || {})
    .filter(([key, value]) => allowedKeys.includes(key) && value) // Keep only allowed keys with non-empty values
    .map(([key, value]) => ({
      label: key,
      value: value as string,
    }));

  const renderAttributes = () => {
    return attributes.map((attr) => (
      <ul
        key={attr.label}
        className="flex justify-between space-y-3 text-[16px] font-normal text-[#7E7E7E]"
      >
        <li>{attr.label}</li>
        <li>{attr.value}</li>
      </ul>
    ));
  };

  return (
    <div className="bg-white p-3 rounded-t-[20px] h-[610px] overflow-y-auto scrollBarThin">
      {attributes.length > 0 ? (
        <div>
          <div className="">{renderAttributes()}</div>
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

export default TextExtractResult;
