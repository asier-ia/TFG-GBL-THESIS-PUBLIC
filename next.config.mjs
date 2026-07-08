/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/TFG-GBL-THESIS-PUBLIC',
  assetPrefix: '/TFG-GBL-THESIS-PUBLIC/',
}

export default nextConfig
