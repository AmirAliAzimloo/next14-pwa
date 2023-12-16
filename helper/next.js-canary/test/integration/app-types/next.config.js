export default {
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    return [
      {
        source: '/rewrite',
        destination: 'https://nextjs.org',
      },
      {
        source: '/rewrite-any/(.*)',
        destination: 'https://nextjs.org',
      },
      {
        source: '/rewrite-one-or-more/:param+',
        destination: 'https://nextjs.org',
      },
      {
        source: '/rewrite-all/:param*',
        destination: 'https://nextjs.org',
      },
      {
        source: '/rewrite-param/:param/page',
        destination: 'https://nextjs.org',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/redirect',
        destination: 'https://nextjs.org',
        permanent: false,
      },
      {
        source: '/redirect(/v1)?/guides/:param/page',
        destination: 'https://nextjs.org',
        permanent: false,
      },
    ]
  },
}
