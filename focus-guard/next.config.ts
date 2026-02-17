import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Vercel 환경이 아닐 때만 로컬 모노레포 루트를 설정합니다.
    root: process.env.VERCEL ? undefined : path.resolve(__dirname, "../../"),
  },
};

export default nextConfig;
