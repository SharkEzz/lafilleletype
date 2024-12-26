import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    DB_FILE_NAME: process.env.DB_FILE_NAME,
  },
};

export default nextConfig;
