import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/brand", destination: "/brand.txt" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
