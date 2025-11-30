import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/queries/blog";
import {
  getAllCategories,
  getAllTags,
  getAllAuthors,
} from "@/lib/queries/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pokygroup.com";
  const locales = ["en", "fr"];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fr/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fr/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    try {
      const posts = await getAllPosts(locale);
      const categories = await getAllCategories(locale);
      const tags = await getAllTags(locale);
      const authors = await getAllAuthors();

      posts.forEach((post) => {
        if (post.published_at) {
          blogPages.push({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: post.updated_at
              ? new Date(post.updated_at)
              : new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          });
        }
      });

      categories.forEach((category) => {
        blogPages.push({
          url: `${baseUrl}/${locale}/category/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      });

      tags.forEach((tag) => {
        blogPages.push({
          url: `${baseUrl}/${locale}/tag/${tag.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      });

      authors.forEach((author) => {
        blogPages.push({
          url: `${baseUrl}/${locale}/author/${author.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.5,
        });
      });
    } catch (error) {
      console.error(`Error generating sitemap for locale ${locale}:`, error);
    }
  }

  return [...staticPages, ...blogPages];
}
