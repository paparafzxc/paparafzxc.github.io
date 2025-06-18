/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/matrix-score-calculator', // Replace with your repo name
  trailingSlash: true,
};

export default nextConfig;