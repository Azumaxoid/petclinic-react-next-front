/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_API_URL : 'http://localhost:8080',
    REACT_APP_API_PREFIX : '/api/v1',
  },
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
}

module.exports = nextConfig
