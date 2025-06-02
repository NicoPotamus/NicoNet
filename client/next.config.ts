import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.leadsnextech.com',
        port: '',
        pathname: '/_next/static/media/**',
        search: '',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.SERVER_URL,
  },
};

export default nextConfig;
