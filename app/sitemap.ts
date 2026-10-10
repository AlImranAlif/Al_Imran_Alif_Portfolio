import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: base.href, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, base).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}