import { findSitemapJobs } from "@/db/data";
import { JobStatus } from "@/utils/const";
import { MetadataRoute } from "next";

const URL = "https://www.nataindata.com";

// NOTE: this probably does not work
export const revalidate = 86_400; // 60 * 60 * 24; revalidate at most every day

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await findSitemapJobs();
  const jobUrls: MetadataRoute.Sitemap = jobs.map((j) => {
    const isPublished = j.status === JobStatus.Published.value;
    return {
      url: `${URL}/jobs/${j.slug}`,
      lastModified: j.updatedAt,
      changeFrequency: isPublished ? "monthly" : "yearly",
      priority: isPublished ? 0.75 : 0.3,
    };
  });

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${URL}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${URL}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...jobUrls,
  ];
}
