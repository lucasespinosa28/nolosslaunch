import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['utfs.io', 'placeholder.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (
    config: any
  ) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  /* other config options here */
};

export default nextConfig;
