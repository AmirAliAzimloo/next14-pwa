/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.BACKEND_DOMAIN}`],
  }
}

module.exports = nextConfig
