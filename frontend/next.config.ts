import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['instagram.fblr12-1.fna.fbcdn.net', 'encrypted-tbn0.gstatic.com', 'avatars.githubusercontent.com', 'i.postimg.cc', 'play-lh.googleusercontent.com', 'images.falabella.com', 'i.giphy.com', 'camo.githubusercontent.com', 'github.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.fblr12-1.fna.fbcdn.net',
        port: '',
        search: '',
      },
    ]
  },
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  rewrites: async () => {
    return [
      {
        source: '/metrics',
        destination: '/api/metrics',
      },
    ];
  }
};

export default (nextConfig);
