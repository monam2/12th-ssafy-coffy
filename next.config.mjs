/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'composecoffee.com',
            port: '',
            pathname: '/files/thumbnails/**',
          },
        ],
      },
};

export default nextConfig;
