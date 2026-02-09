import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Runtime configuration
  serverExternalPackages: ['@prisma/client'], // Allow Prisma in server components
  
  // Webpack configuration to handle Prisma WASM issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          './node_modules/.prisma/client/query_engine_bg.js': false,
          './node_modules/.prisma/client/query_engine_bg.wasm': false,
        },
        alias: {
          './node_modules/.prisma/client/query_engine_bg.js': './prisma-engine-empty.js',
          './node_modules/.prisma/client/query_engine_bg.wasm': './prisma-engine-empty.js',
        },
      }
    }
    return config
  },
  
  // Image optimization for production
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // Production image optimization settings
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable production optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundle

  // Security headers
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
