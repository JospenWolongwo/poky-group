import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-skeleton";
import { AffiliateRecommendations } from "@/components/blog/affiliate-recommendations";
import { getAllPosts, getFeaturedAffiliateProducts } from "@/lib/queries/blog";
import { generateBlogListMetadata } from "@/lib/seo/blog-metadata";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateBlogListMetadata(locale);
}

async function BlogList({ locale }: { locale: string }) {
  const [posts, featuredProducts] = await Promise.all([
    getAllPosts(locale),
    getFeaturedAffiliateProducts(6),
  ]);

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No posts found</h1>
          <p className="text-muted-foreground">
            Check back soon for new articles!
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === "fr"
              ? "Dernières Actualités & Articles Tech"
              : "Latest Insights & Tech Articles"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === "fr"
              ? "Restez à jour avec les dernières tendances en développement web, IA, cloud computing et ingénierie logicielle."
              : "Stay updated with the latest trends in web development, AI, cloud computing, and software engineering."}
          </p>
        </div>

        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <AffiliateRecommendations
              affiliates={featuredProducts}
              title={
                locale === "fr" ? "Produits Recommandés" : "Featured Products"
              }
              subtitle={
                locale === "fr"
                  ? "Découvrez nos outils et services recommandés"
                  : "Discover our recommended tools and services"
              }
              columns={3}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} locale={locale} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
      <BlogList locale={locale} />
    </Suspense>
  );
}
