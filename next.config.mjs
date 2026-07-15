/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      // @mediapipe/hands ships as a UMD/global-script bundle with no real ESM
      // exports. hand-pose-detection statically imports it but this app only
      // uses the "tfjs" runtime, so it's safe to alias to a stub.
      "@mediapipe/hands": "./lib/tryon/mediapipe-hands-stub.js",
    },
  },
}

export default nextConfig
