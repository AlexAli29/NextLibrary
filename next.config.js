const dns = require("dns");

/** @type {import('next').NextConfig} */
dns.setDefaultResultOrder("ipv4first")
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
