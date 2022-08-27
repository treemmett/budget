/** @type {import('next').NextConfig} */
const nextConfig = {
  /** @param {import('webpack').Configuration} config */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
