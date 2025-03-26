"use client";

import RightMark from "@/components/svg/right";
import WrongMark from "@/components/svg/wrong";
import React from "react";

interface FormData {
  fullName: string;
  address: string;
  sex: string;
  dob: string | null; // Store formatted date as string
}
interface LicensePassportData {
  "Full Name": string;
  Address: string;
  Sex: string;
  "Date of Birth": string | null; // Store formatted date as string
}

interface InformationType {
  parsedFormData: FormData;
  parsedLicenseData: LicensePassportData[];
  parsedPassportData: LicensePassportData;
}

const InformationMatching = ({
  parsedFormData,
  parsedLicenseData,
  parsedPassportData,
}: InformationType) => {
  const getStatusIcon = (inputValue: unknown, documentValue: unknown) => {
    return inputValue === documentValue ? <RightMark /> : <WrongMark />;
  };
  return (
    <div className="overflow-x-auto mt-4 rounded-[20px] border-2">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-r border-gray-200">Name</th>
            <th className="p-3 border-r border-gray-200">Inputed details</th>
            <th className="p-3 border-r border-gray-200">Document</th>
            <th className="p-3 border-r border-gray-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          <tr>
            <td className="p-3 border border-gray-200">Name</td>
            <td className="p-3 border border-gray-200">
              {parsedFormData?.fullName}
            </td>
            <td className="p-3 border border-gray-200">
              {!!parsedLicenseData
                ? parsedLicenseData[1]?.["Full Name"]
                : parsedPassportData?.["Full Name"]}
            </td>
            <td className="p-3 border border-gray-200">
              {getStatusIcon(
                parsedFormData?.fullName,
                !!parsedLicenseData
                  ? parsedLicenseData[1]?.["Full Name"]
                  : parsedPassportData?.["Full Name"]
              )}
            </td>
          </tr>
          {/* Row 2 */}
          <tr>
            <td className="p-3 border border-gray-200">Address</td>
            <td className="p-3 border border-gray-200">
              {parsedFormData?.address}
            </td>
            <td className="p-3 border border-gray-200">
              {!!parsedLicenseData
                ? parsedLicenseData[1]?.["Address"]
                : parsedPassportData?.Address}
            </td>
            <td className="p-3 border border-gray-200">
              {getStatusIcon(
                parsedFormData?.address,
                !!parsedLicenseData
                  ? parsedLicenseData[1]?.["Address"]
                  : parsedPassportData?.["Address"]
              )}
            </td>
          </tr>
          {/* Row 3 */}
          <tr>
            <td className="p-3 border border-gray-200">Birthday</td>
            <td className="p-3 border border-gray-200">
              {parsedFormData?.dob}
            </td>
            <td className="p-3 border border-gray-200">
              {!!parsedLicenseData
                ? parsedLicenseData[1]?.["Date of Birth"]
                : parsedPassportData?.["Date of Birth"]}
            </td>
            <td className="p-3 border border-gray-200">
              {getStatusIcon(
                parsedFormData?.dob,
                !!parsedLicenseData
                  ? parsedLicenseData[1]?.["Date of Birth"]
                  : parsedPassportData?.["Date of Birth"]
              )}
            </td>
          </tr>
          {/* Row 4 */}
          {/* <tr>
            <td className="p-3 border border-gray-200">Sex</td>
            <td className="p-3 border border-gray-200">
              {parsedFormData?.sex}
            </td>
            <td className="p-3 border border-gray-200">
              {!!parsedLicenseData
                ? parsedLicenseData[1]?.["Sex"]
                : parsedPassportData?.["Sex"]}
            </td>
            <td className="p-3 border border-gray-200">
              {getStatusIcon(
                parsedFormData.sex,
                !!parsedLicenseData
                  ? parsedLicenseData[1]?.["Sex"]
                  : parsedPassportData?.["Sex"]
              )}
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default InformationMatching;
