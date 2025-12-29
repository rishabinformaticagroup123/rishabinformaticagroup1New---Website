/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // ✅ Add ONLY this line for Snowflake SDK
  serverExternalPackages: ['snowflake-sdk'],
  
  // ✅ Add this to fix Turbopack error
  turbopack: {},
};

export default nextConfig;