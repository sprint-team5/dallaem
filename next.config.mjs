/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        pathname: "/together-dallaem/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/mypage/edit",
        destination: "/mypage",
      },
      {
        source: "/mypage/addReview",
        destination: "/mypage",
      },
    ]
  },
}

export default nextConfig
