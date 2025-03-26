import FaceDetection from "@/components/face-detection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Face Detection - MINIAILIVE",
  description: "Face Detection for MiniAILive Online Demo",
};
export default function Home() {
  return (
    <section className="bg-white pt-3">
      <div>
        <h1 className="text-center text-[36px] font-medium text-black mt-2 mb-3">
          Face Detection
        </h1>
      </div>
      <FaceDetection />
    </section>
  );
}
