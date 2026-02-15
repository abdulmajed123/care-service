/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com", // New domain added
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
