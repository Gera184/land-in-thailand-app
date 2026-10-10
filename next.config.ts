import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: the `out/` folder can be hosted anywhere (Netlify, Vercel, GitHub Pages…)
  output: "export",
  // /en/ → out/en/index.html, which every static host serves correctly
  trailingSlash: true,
  images: { unoptimized: true },
  // Styles arrive inside the HTML, so the first paint doesn't wait for a CSS request
  experimental: { inlineCss: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
