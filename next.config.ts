import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Ceilings post: renamed slug bamboo-reed-ceilings -> bamboo-ceilings.
      {
        source: "/blog/bamboo-reed-ceilings",
        destination: "/blog/bamboo-ceilings",
        permanent: true,
      },
      {
        source: "/:locale/blog/bamboo-reed-ceilings",
        destination: "/:locale/blog/bamboo-ceilings",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
