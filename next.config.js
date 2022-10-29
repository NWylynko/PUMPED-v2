
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  // compiler: {
  //   styledComponents: true,
  // },
  experimental: {
    appDir: true
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig