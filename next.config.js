const dns = require("dns");

/** @type {import('next').NextConfig} */
dns.setDefaultResultOrder("ipv4first")
const nextConfig = {

  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "bodymastersksa.com",
      "pbs.twimg.com",
      "argaamplus.s3.amazonaws.com",
      "www.kindpng.com",
      "res.cloudinary.com",
    ],
  },
}

module.exports = nextConfig
