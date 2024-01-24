import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      disallow: "/",
      userAgent: "Googlebot-Image",
    },
    {
      disallow: "/",
      userAgent: "*",
    },
  ],
});

export default robots;
