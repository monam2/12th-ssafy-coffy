/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: '.',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "composecoffee.com",
        port: "",
        pathname: "/files/thumbnails/**",
      },
    ],
  },
};

export default nextConfig;
