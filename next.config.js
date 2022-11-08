/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'files.stripe.com'
    ]
  },

  experimental: {
    newNextLinkBehavior: true,
    images: {
      unoptimized: true,
      allowFutureImage: true,
    },
  }
  
}

module.exports = nextConfig
