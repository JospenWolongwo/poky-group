"use client";

import { useTranslations } from "next-intl";
import { AffiliateProductCard } from "./affiliate-product-card";
import type { ExtendedAffiliateLink } from "@/lib/queries/blog";

interface AffiliateRecommendationsProps {
  readonly affiliates: ExtendedAffiliateLink[];
  readonly title?: string;
  readonly subtitle?: string;
  readonly limit?: number;
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
}

export function AffiliateRecommendations({
  affiliates,
  title,
  subtitle,
  limit = 4,
  columns = 3,
  className,
}: AffiliateRecommendationsProps) {
  const t = useTranslations("blog.affiliate");

  if (affiliates.length === 0) {
    return null;
  }

  const displayedAffiliates = affiliates.slice(0, limit);
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`py-8 ${className || ""}`}>
      <div className="mb-6">
        {title && (
          <h2 className="text-2xl font-bold mb-2">
            {title || t("recommendedProducts")}
          </h2>
        )}
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {displayedAffiliates.map((affiliate) => (
          <AffiliateProductCard key={affiliate.id} affiliate={affiliate} />
        ))}
      </div>
    </section>
  );
}
