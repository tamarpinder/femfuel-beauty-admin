/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    domains: ['jirxwaxilgdhqudbrgbl.supabase.co'],
  },
}

module.exports = nextConfig