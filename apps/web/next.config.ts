import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/shared-types', '@repo/vision-core', '@repo/ui-components'],
};

export default nextConfig;
