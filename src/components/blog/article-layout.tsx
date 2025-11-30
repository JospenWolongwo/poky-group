"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RichContent } from "./rich-content";
import { BlogCard } from "./blog-card";
import { AffiliateSidebar } from "./affiliate-sidebar";
import { AffiliateRecommendations } from "./affiliate-recommendations";
import type { BlogPostFull, BlogPostWithTranslation } from "@/lib/queries/blog";
import type { Author } from "@/lib/queries/blog";

interface ArticleLayoutProps {
  post: BlogPostFull;
  relatedPosts: BlogPostWithTranslation[];
  locale: string;
}

export function ArticleLayout({
  post,
  relatedPosts,
  locale,
}: ArticleLayoutProps) {
  const t = useTranslations("blog");

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} ${t("readTime")}`;
  };

  const coverImage =
    post.cover_image_url ||
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop&crop=center";
  const categoryName = post.category?.translation?.name || "";
  const categorySlug = post.category?.slug || "";
  // Handle author - can be string (author name) or Author object
  const isAuthorObject = (
    author: string | Author | undefined
  ): author is Author => {
    return (
      author !== undefined && typeof author === "object" && author !== null
    );
  };
  const authorObj = isAuthorObject(post.author) ? post.author : null;
  const authorName =
    authorObj?.name ||
    (typeof post.author === "string" ? post.author : "") ||
    "";
  const authorSlug = authorObj?.slug || "";
  const authorBio = authorObj?.bio || "";
  const authorAvatar = authorObj?.avatar_url || "";
  const tags = post.tags || [];

  const affiliateLinks = post.affiliate_links || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToBlog")}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={coverImage}
              alt={post.translation.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="space-y-4">
            {categoryName && (
              <div>
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary border-primary/30"
                >
                  {categoryName}
                </Badge>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold">
              {post.translation.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadTime(post.translation.content)}</span>
              </div>
              {authorName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {authorSlug ? (
                    <Link
                      href={`/${locale}/author/${authorSlug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {authorName}
                    </Link>
                  ) : (
                    <span>{authorName}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {affiliateLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12"
          >
            <AffiliateRecommendations
              affiliates={affiliateLinks.slice(0, 3)}
              title={t("affiliate.topRecommendations")}
              columns={3}
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RichContent
              content={post.translation.content}
              mediaAssets={post.media_assets}
              affiliateLinks={post.affiliate_links}
            />
          </motion.div>

          {affiliateLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="hidden lg:block"
            >
              <AffiliateSidebar
                affiliates={affiliateLinks}
                sticky={true}
                limit={3}
              />
            </motion.div>
          )}
        </div>

        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium mr-2">{t("tags")}:</span>
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/${locale}/tag/${tag.slug}`}
                  className="px-3 py-1 text-sm bg-muted hover:bg-primary/10 text-primary rounded-full transition-colors"
                >
                  {tag.translation?.name || tag.slug}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {categorySlug && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">
                {t("category")}:
              </p>
              <Link
                href={`/${locale}/category/${categorySlug}`}
                className="text-lg font-semibold hover:text-primary transition-colors"
              >
                {categoryName}
              </Link>
            </div>
          </motion.div>
        )}

        {authorName && authorBio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 p-6 border rounded-lg bg-muted/50"
          >
            <div className="flex items-start gap-4">
              {authorAvatar && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={authorAvatar}
                    alt={authorName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2">{authorName}</h3>
                <p className="text-muted-foreground">{authorBio}</p>
                {authorSlug && (
                  <Link
                    href={`/${locale}/author/${authorSlug}`}
                    className="text-sm text-primary hover:underline mt-2 inline-block"
                  >
                    {t("viewAllPosts")}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {affiliateLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <AffiliateRecommendations
              affiliates={affiliateLinks}
              title={t("affiliate.relatedProducts")}
              columns={3}
            />
          </motion.div>
        )}

        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8">{t("relatedPosts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  locale={locale}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
}
