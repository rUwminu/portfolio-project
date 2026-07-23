import type { MetadataRoute } from "next";

const BASE_URL = "https://portfolio-project-dusky-eight.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const workSlugs = [
    "eventsocial",
    "ninekitchen",
    "outfitstore",
    "recordlike",
    "stanlybottle",
    "syplt",
  ];

  return [
    {
      url: `${BASE_URL}/portfolio`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio/works`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...workSlugs.map((slug) => ({
      url: `${BASE_URL}/portfolio/works/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
