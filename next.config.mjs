// Set by the GitHub Pages workflow, e.g. "/Reperoo-landing-page"; empty locally.
const basePath = process.env.PAGES_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  output: "export",
  trailingSlash: true,
  basePath,
  env: { BASE_PATH: basePath },
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default nextConfig;
