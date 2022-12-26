/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_PREFIX : '/api/v1',
    NEXT_PUBLIC_BK_DIRECT: 'false',
  },
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
