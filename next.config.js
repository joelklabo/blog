/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/.well-known/nostr.json",
        destination: "/api/.well-known/nostr"
      },
    ];
  },
};

module.exports = nextConfig
