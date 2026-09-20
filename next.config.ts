import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  // Use TypeScript 6's compiler API; CLI capture is unreliable in this sandbox.
  experimental: { useTypeScriptCli: false },
};
export default nextConfig;
