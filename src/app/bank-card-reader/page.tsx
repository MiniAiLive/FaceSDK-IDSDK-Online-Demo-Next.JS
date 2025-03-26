import CardReader from "@/components/bank-card-reader";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Bank & Credit Card Recognition - MINIAILIVE",
  description: "Bank & Credit Card Recognition for MiniAILive Online Demo",
};
const BankCardReader = () => {
  return (
    <div className="bg-white pt-3">
      <CardReader />
    </div>
  );
};

export default BankCardReader;
