/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  reactStrictMode: false,
  webpack: {
    // Treat sharp as an external module so we can do this.
    //
    //     import sharp from "sharp";
    //
    sharp: "commonjs sharp",
  },
};

export default nextConfig;
