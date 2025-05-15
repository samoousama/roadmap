/** @type {import('next').NextConfig} */
const nextConfig = {
  // reverse proxy for /blog on Ghost. DO NOT delete it
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/blog/:path*/",
        destination: "https://nata-blog.fly.dev/blog/:path*/",
      },
      {
        source: "/blog/:path*",
        destination: "https://nata-blog.fly.dev/blog/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/blog/:path*",
        headers: [{ key: "x-forwarded-host", value: "nataindata.com" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
      },
      {
        hostname: "*.nataindata.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/jobs/edit",
        destination: "/my-jobs",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/legal/privacy",
        permanent: true,
      },
      {
        source: "/legal",
        destination: "/legal/privacy",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
