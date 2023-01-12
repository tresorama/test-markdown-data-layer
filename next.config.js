/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint scanned dir
  eslint: {
    dirs: ['src']
  }
};

module.exports = nextConfig;
