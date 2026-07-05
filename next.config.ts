import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "https://nest-general-api.onrender.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // better-auth lives at /api/auth on the Nest server itself
      {
        source: "/api/auth/:path*",
        destination: `${API_URL}/api/auth/:path*`,
      },
      // everything else is mounted at the Nest root (/event, /user, ...)
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
