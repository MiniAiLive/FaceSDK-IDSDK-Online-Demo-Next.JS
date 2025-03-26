"use client";

import React from "react";
import Image from "next/image";
import image from "../../assets/face-demo-app.png";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import whatsapp from "@/assets/whatsapp.png";
const TopNavbar = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`We are online.`);
    window.open(
      `https://api.whatsapp.com/send?phone=19162702374&text=${message}`,
      "_blank"
    );
  };
  return (
    <section className="flex items-center justify-between space-x-2 min-w-full lg:max-w-[1560px] mx-auto lg:p-3 bg-white">
      <SidebarTrigger />
      <div
        style={{
          position: "fixed",
          bottom: "60px",
          right: "40px",
          cursor: "pointer",
          zIndex: "99999999",
        }}
      >
        <button onClick={handleWhatsAppClick}>
          <Image
            src={whatsapp}
            alt="Call consultor whatsapp"
            width={200}
            height={67}
          />
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center mx-52">
        <Image
          src={image}
          alt="image"
          layout="intrinsic" // Maintains aspect ratio based on image dimensions
          width={400} // Match the actual width of your image
          height={200} // Match the actual height of your image
          priority // Preloads the image for better quality
          className="rounded-md" // Optional: Add rounding or other effects
        />
      </div>

      <div className="hidden md:flex justify-end space-x-4 ml-auto h-[48px]">
        <Link href={"https://docs.miniai.live"}>
          <Button
            variant="outline"
            className="border border-[rgb(255,80,0)] rounded-full py-5 text-[16px] px-4 text-[#FF5000] hover:bg-transparent hover:text-[#FF5000]"
          >
            Documentation
          </Button>
        </Link>
        {/* <Link href="https://miniai.live/contact/">
          <Button
            variant="outline"
            className="border border-[#FF5000] rounded-full5 text-[16px] px-4 text-white bg-[#FF5000] hover:bg-[#FF5000] hover:text-white"
          >
            Contact Us
          </Button>
        </Link> */}
        <Link href="https://github.com/MiniAiLive">
          <Button
            variant="outline"
            className="border border-[#FF5000] rounded-full py-5 text-[16px] px-4 text-white bg-[#FF5000] hover:bg-[#FF5000] hover:text-white"
          >
            Github
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TopNavbar;
