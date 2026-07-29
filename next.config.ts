import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      { protocol: "https", hostname: "www.w3.org" },
      { protocol: "http", hostname: "localhost", port: "3001", pathname: "/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "3001", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
