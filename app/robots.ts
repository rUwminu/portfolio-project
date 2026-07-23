import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/portfolio",
      disallow: "/",
    },
    sitemap: "https://portfolio-project-dusky-eight.vercel.app/sitemap.xml",
  };
}
