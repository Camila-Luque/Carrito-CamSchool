/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "Carrito-CamSchool";

const nextConfig = {
  reactStrictMode: true,
  ...(isProd && {
    output: "export",
    basePath: `/${repo}`,
    images: { unoptimized: true },
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "",
  },
};

export default nextConfig;