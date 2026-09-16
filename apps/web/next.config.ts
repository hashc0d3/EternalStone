import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../..'),
  transpilePackages: ['@eternal-stone/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'api',
        port: '4000',
        pathname: '/media/**',
      },
    ],
  },
  async rewrites() {
    const api = process.env.API_INTERNAL_URL;
    if (!api) return [];
    return [{ source: '/backend/:path*', destination: `${api}/:path*` }];
  },
};

export default nextConfig;
