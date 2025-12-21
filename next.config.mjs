/** @type {import('next').NextConfig} */
const nextConfig = {
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
