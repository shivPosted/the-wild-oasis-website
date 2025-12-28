/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oxhstlsiyihxwfdgxwly.supabase.co",
        pathname: "/storage/v1/object/public/the_oasis_cabin_images/**",
      },
    ],
  },
};

export default nextConfig;
