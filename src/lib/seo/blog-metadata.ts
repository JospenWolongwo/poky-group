import type { Metadata } from "next";
import type { BlogPostFull } from "@/lib/queries/blog";

export function generateBlogMetadata(
  post: BlogPostFull,
  locale: string
): Metadata {
  const title = post.translation.seo_title || post.translation.title;
  const description =
    post.translation.seo_description || post.translation.excerpt;
  const keywords: string[] = [];
  const coverImage = post.cover_image_url || "";
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pokygroup.com";
  const url = `${siteUrl}/${locale}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "POKY GROUP",
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: post.translation.title,
            },
          ]
        : [],
      locale,
      type: "article",
      publishedTime: post.published_at || undefined,
      authors:
        post.author && typeof post.author === "object"
          ? [post.author.name]
          : typeof post.author === "string"
          ? [post.author]
          : undefined,
      tags: post.tags?.map((tag) => tag.translation?.name || tag.slug) || [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/blog/${post.slug}`,
        fr: `${siteUrl}/fr/blog/${post.slug}`,
      },
    },
  };
}

export function generateBlogListMetadata(locale: string): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pokygroup.com";
  const title =
    locale === "fr"
      ? "Blog - Dernières Actualités & Articles Tech"
      : "Blog - Latest Tech Insights & Software Development Articles";
  const description =
    locale === "fr"
      ? "Restez à jour avec les dernières tendances en développement web, IA, cloud computing et ingénierie logicielle."
      : "Stay updated with the latest trends in web development, AI, cloud computing, and software engineering. Expert insights from POKY GROUP development team.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/blog`,
      siteName: "POKY GROUP",
      locale,
      type: "website",
    },
  };
}

export function generateCategoryMetadata(
  categoryName: string,
  locale: string
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pokygroup.com";
  const title =
    locale === "fr"
      ? `Articles de la catégorie: ${categoryName}`
      : `Category: ${categoryName} - Blog`;

  return {
    title,
    description: `${title} - POKY GROUP Blog`,
    openGraph: {
      title,
      url: `${siteUrl}/${locale}/category/${categoryName}`,
      siteName: "POKY GROUP",
      locale,
      type: "website",
    },
  };
}

export function generateTagMetadata(tagName: string, locale: string): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pokygroup.com";
  const title =
    locale === "fr"
      ? `Articles avec le tag: ${tagName}`
      : `Tag: ${tagName} - Blog`;

  return {
    title,
    description: `${title} - POKY GROUP Blog`,
    openGraph: {
      title,
      url: `${siteUrl}/${locale}/tag/${tagName}`,
      siteName: "POKY GROUP",
      locale,
      type: "website",
    },
  };
}

export function generateAuthorMetadata(
  authorName: string,
  locale: string
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pokygroup.com";
  const title =
    locale === "fr"
      ? `Articles par ${authorName}`
      : `Articles by ${authorName} - Blog`;

  return {
    title,
    description: `${title} - POKY GROUP Blog`,
    openGraph: {
      title,
      url: `${siteUrl}/${locale}/author/${authorName}`,
      siteName: "POKY GROUP",
      locale,
      type: "profile",
    },
  };
}
