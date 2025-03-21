/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['i.pinimg.com', 'pinterest.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('fs').copyFileSync(
        './public/sitemap.xml',
        './.next/sitemap.xml'
      );
    }
    return config;
  },
};

module.exports = nextConfig;
