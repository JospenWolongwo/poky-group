import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries/blog";
import { generateBlogMetadata } from "@/lib/seo/blog-metadata";
import { ArticleLayout } from "@/components/blog/article-layout";
import { ArticleSkeleton } from "@/components/blog/blog-skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogMetadata(post, locale);
}

async function BlogPost({ locale, slug }: { locale: string; slug: string }) {
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(
    locale,
    post.category_id || post.category?.id || null,
    post.id,
    3
  );

  return (
    <ArticleLayout post={post} relatedPosts={relatedPosts} locale={locale} />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!["en", "fr"].includes(locale)) {
    notFound();
  }

  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <BlogPost locale={locale} slug={slug} />
    </Suspense>
  );
}
