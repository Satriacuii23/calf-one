import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.aliyuncs.com",
      },
    ],
  },
};

export default nextConfig;

