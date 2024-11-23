import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  
  // Add other Next.js config options as needed
  webpack: (config) => {
    // Add any webpack customizations if needed
    return config
  }
}

export default nextConfig