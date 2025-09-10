import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: " ", // leave empty if default
        pathname: "/**", // allows all paths
      },
    ],
  },
};

export default nextConfig;
