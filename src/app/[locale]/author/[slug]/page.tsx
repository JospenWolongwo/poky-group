import { notFound } from "next/navigation";
import { getPostsByAuthor, getAuthorBySlug } from "@/lib/queries/blog";
import { generateAuthorMetadata } from "@/lib/seo/blog-metadata";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-skeleton";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return generateAuthorMetadata(author.name, locale);
}

async function AuthorPage({ locale, slug }: { locale: string; slug: string }) {
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(locale, author.name);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="flex flex-col items-center gap-4">
            {author.avatar_url && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={author.avatar_url}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === "fr"
                ? "Aucun article trouvé pour cet auteur."
                : "No posts found for this author."}
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

export default async function AuthorPageRoute({
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
      <AuthorPage locale={locale} slug={slug} />
    </Suspense>
  );
}


