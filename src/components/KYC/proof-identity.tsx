import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import KycRadioTik from "../svg/kyc-radio-tik";
import KycRadio from "../svg/kyc-radio";
import License from "./_components/license";
import Passport from "./_components/passport";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface KYCFormProps {
  router: AppRouterInstance;
}

const ProofIdentity: FC<KYCFormProps> = ({ router }) => {
  const [selectedValue, setSelectedValue] = useState(
    "Driver license, national ID"
  );

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div
      className={`${
        selectedValue === "Passport" ? "lg:w-[455px]" : "lg:w-[715px]"
      } flex flex-col items-center mb-6 mx-auto`}
    >
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <KycRadioTik />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <KycRadio />
        <div className="w-8 h-0.5 bg-gray-300"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
          3
        </div>
      </div>

      {/* Subtitle */}
      <h2 className="text-center text-[16px] font-semibold my-5">
        Upload a proof of your identity
      </h2>
      <p className="text-[16px] font-normal text-black/40 mb-4 text-center">
        We requires a valid government issue ID (driver license, passport,
        national ID)
      </p>

      {/* select  */}

      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full mb-5">
          <SelectValue placeholder="Driver license, national ID" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Driver license, national ID">
            Driver license, national ID
          </SelectItem>
          <SelectItem value="Passport">Passport</SelectItem>
        </SelectContent>
      </Select>

      {/* image */}
      <div className="flex lg:gap-x-4 h-full lg:h-[500px] w-full lg:w-[715px] justify-center">
        {selectedValue === "Driver license, national ID" && (
          <License router={router} />
        )}

        {selectedValue === "Passport" && <Passport router={router} />}
      </div>
    </div>
  );
};

export default ProofIdentity;
