/** @type {import('next').NextConfig} */
const nextConfig = {
  // use to stop google user profile image from forbidden access
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'referrer-policy', value: 'no-referrer' }],
      },
    ]
  },
}

module.exports = nextConfig
