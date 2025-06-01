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
};

export default nextConfig;
