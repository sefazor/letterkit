import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const registryDist = path.join(__dirname, '../../packages/registry/dist/index.js');
const themeDist = path.join(__dirname, '../../packages/theme/dist/index.js');

const nextConfig: NextConfig = {
  transpilePackages: ['@letterkit/theme', '@letterkit/registry'],
  outputFileTracingRoot: path.join(__dirname, '../..'),
  experimental: {
    externalDir: true,
  },
  turbopack: {
    resolveAlias: {
      '@letterkit/registry': registryDist,
      '@letterkit/theme': themeDist,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@letterkit/registry': registryDist,
      '@letterkit/theme': themeDist,
    };
    return config;
  },
};

export default nextConfig;
