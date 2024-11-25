import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
