import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:  {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This matches any domain
      },
    ],
  },
};

export default nextConfig;
