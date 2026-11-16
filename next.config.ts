import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // #region agent log
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  // #endregion
};

export default nextConfig;
