/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // punycode 관련 설정 유지
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: 'punycode/',
    }
    return config;
  }
};

export default nextConfig;
