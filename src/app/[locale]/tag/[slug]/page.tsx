import { notFound } from "next/navigation";
import { getPostsByTag, getTagBySlug } from "@/lib/queries/blog";
import { generateTagMetadata } from "@/lib/seo/blog-metadata";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tag = await getTagBySlug(locale, slug);

  if (!tag || !tag.translation) {
    return {
      title: "Tag Not Found",
    };
  }

  return generateTagMetadata(tag.translation.name, locale);
}

async function TagPage({ locale, slug }: { locale: string; slug: string }) {
  const tag = await getTagBySlug(locale, slug);

  if (!tag || !tag.translation) {
    notFound();
  }

  const posts = await getPostsByTag(locale, slug);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "fr" ? "Articles avec le tag" : "Posts tagged"} &quot;
            {tag.translation.name}&quot;
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === "fr"
                ? "Aucun article trouvé avec ce tag."
                : "No posts found with this tag."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default async function TagPageRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!["en", "fr"].includes(locale)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <TagPage locale={locale} slug={slug} />
    </Suspense>
  );
}
