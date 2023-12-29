/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['firebasestorage.googleapis.com', "res.cloudinary.com","www.drivespark.com", "i.ibb.co"],
    unoptimized: true,
  },
}

module.exports = nextConfig
