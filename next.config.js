/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://yokhuroute.store/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
