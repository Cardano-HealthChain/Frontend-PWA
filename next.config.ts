import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add turbopack config here
  turbopack: {}
};

export default withPWAConfig(nextConfig as any);