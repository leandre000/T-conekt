/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['localhost'],
  },

  experimental: {
    // Fixing error: Expected object, not boolean
    serverActions: {
      enabled: true,
    },
    swcPlugins: [], // include this if you're customizing SWC in the future
  },
};

module.exports = nextConfig;
