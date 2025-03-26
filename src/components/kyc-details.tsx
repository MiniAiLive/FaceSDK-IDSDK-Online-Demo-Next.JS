"use client";

import React, { Suspense } from "react";
import KYCForm from "./KYC/_components/kyc-form";
import { useRouter, useSearchParams } from "next/navigation";
import ProofIdentity from "./KYC/proof-identity";
import Selfie from "./KYC/selfie";
import KYCVerificationResult from "./KYC/KYCVerificationResult";
// import FaceMatchingKYC from "./KYC/_components/face-matching-kyc";

function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const license = searchParams.get("license");
  // const matching = searchParams.get("face-matching");
  const selfie = searchParams.get("selfie");
  const result = searchParams.get("result");
  return (
    <>
      {!license && <KYCForm router={router} />}

      {license && license === "proof-identity" && selfie !== "selfie" && (
        <ProofIdentity router={router} />
      )}
      {/* {matching && matching === "face-matching" && selfie !== "selfie" && (
        <FaceMatchingKYC router={router} />
      )} */}
      {selfie && selfie === "selfie" && result !== "result" && <Selfie />}
      {result && result === "result" && <KYCVerificationResult />}
    </>
  );
}
const KycDetails = () => {
  return (
    <section className="lg:w-11/12  mx-auto">
      <div>
        <h1 className="text-center text-[28px] lg:text-[36px] font-medium text-black mt-1">
          OpenKYC
        </h1>
      </div>

      <p className="text-center text-[16px] font-normal text-black/40 mt-2 lg:w-[725px] mx-auto">
        Know Your Customer Software helps the financial and banking industries
        learn about their users and prevent fraud and criminal activity
      </p>
      <Suspense>
        <SearchComponent></SearchComponent>
      </Suspense>
    </section>
  );
};

export default KycDetails;
