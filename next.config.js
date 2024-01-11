/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')()

const nextConfig = {
  images: {
    domains: ['www.datocms-assets.com'],
  },
}

module.exports = withNextIntl(nextConfig)
