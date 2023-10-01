/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, defaultLoaders }) => {
    if (!isServer) {
      config.resolve.fallback = {
        // fs: false,
        // child_process: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
