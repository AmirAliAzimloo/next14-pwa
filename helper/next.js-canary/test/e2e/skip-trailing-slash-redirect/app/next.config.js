/** @type {import('next').NextConfig} */
const nextConfig = {
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    externalMiddlewareRewritesResolve: true,
  },
  i18n: {
    locales: ['en', 'ja-jp'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/redirect-me',
        destination: '/another',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/rewrite-me',
        destination: '/another',
      },
    ]
  },
}

module.exports = nextConfig
