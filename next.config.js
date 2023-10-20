/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:[
      'localhost:3000',
      'ik.imagekit.io'
    ]
  }
}

module.exports = nextConfig
