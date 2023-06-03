/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        // source: '/login/oauth2/code/google',
        // destination: 'https://yokhuroute.store/login/oauth2/code/google',
        source: '/:path*',
        destination: 'https://yokhuroute.store/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
