import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: deploy `out/` to Cloudflare Pages, Vercel, or any static host.
  output: "export",
};

export default nextConfig;
