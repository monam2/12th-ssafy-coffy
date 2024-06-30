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
      webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
          config.devtool = 'eval-source-map';
        }
        return config;
      },
};

export default nextConfig;
