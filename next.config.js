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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.invertimage.net',
          },
        ],
        destination: 'https://invertimage.net/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
