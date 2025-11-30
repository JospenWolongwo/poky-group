"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import type { BlogPostWithTranslation } from "@/lib/queries/blog";

interface BlogCardProps {
  post: BlogPostWithTranslation;
  locale: string;
  index?: number;
}

export function BlogCard({ post, locale, index = 0 }: BlogCardProps) {
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
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center";
  const categoryName = post.category?.translation?.name || "";
  const tags = post.tags || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${25 + i * 20}%`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="relative h-48 w-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={coverImage}
              alt={post.translation.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {categoryName && (
              <div className="absolute top-4 left-4">
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary border-primary/30"
                >
                  {categoryName}
                </Badge>
              </div>
            )}
          </motion.div>
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            {post.published_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at)}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {calculateReadTime(post.translation.content)}
            </div>
          </div>

          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.translation.title}
          </CardTitle>

          <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
            {post.translation.excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag.id}
                  className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Tag className="h-3 w-3" />
                  {tag.translation?.name || tag.slug}
                </motion.span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" className="w-full group/btn" asChild>
              <Link href={`/${locale}/blog/${post.slug}`}>
                {t("readMore")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </CardContent>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
        />
      </Card>
    </motion.article>
  );
}
