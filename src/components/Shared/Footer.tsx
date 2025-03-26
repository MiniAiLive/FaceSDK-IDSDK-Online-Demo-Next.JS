import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full h-[63px] bg-white mt-5">
      <p className="text-[16px] font-medium text-center p-5 text-[#0000006B]">
        Copyright ©{currentYear} by MiniAiLive LLC
      </p>
    </div>
  );
};

export default Footer;
