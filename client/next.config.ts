import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agribegri.com',
      },
      {
        protocol: 'https',
        hostname: 'dujjhct8zer0r.cloudfront.net',
      },
    ],
  },
  // Exclude backend folder from webpack build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    // Ignore backend folder
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/backend/**', '**/node_modules/**'],
    };
    return config;
  },
  // Turbopack configuration for Next.js 16
  turbopack: {
    // Set root directory to the directory containing this config file
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
