import type { NextConfig } from "next";

const nextConfig: NextConfig = {
allowedDevOrigins: ['192.168.1.107'],
  turbopack: {
    // @splinetool/runtime references its draco decoder and boolean-op wasm
    // files via `new URL("...", import.meta.url)`, but those files aren't
    // shipped in the npm package, so Turbopack can't resolve them at build
    // time. This project's Spline scenes don't use Draco-compressed meshes
    // or boolean operations, so the missing assets are safe to ignore.
    ignoreIssue: [
      {
        path: "**/@splinetool/runtime/**",
      },
    ],
  },
  images: {
    domains: ["images.unsplash.com","plus.unsplash.com",'cdn.21st.dev'],
  }
};

export default nextConfig;
