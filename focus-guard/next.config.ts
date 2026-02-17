import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopack: {
      // Vercel 환경이 아닐 때만 로컬 모노레포 루트를 설정합니다.
      // Vercel에서는 Root Directory 설정을 통해 자동으로 처리됩니다.
      root: process.env.VERCEL ? undefined : path.resolve(__dirname, "../../"),
    },
  },
};

export default nextConfig;
