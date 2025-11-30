"use client";

import { useTranslations } from "next-intl";
import { AffiliateProductCard } from "./affiliate-product-card";
import type { ExtendedAffiliateLink } from "@/lib/queries/blog";

interface AffiliateSidebarProps {
  readonly affiliates: ExtendedAffiliateLink[];
  readonly sticky?: boolean;
  readonly limit?: number;
  readonly className?: string;
}

export function AffiliateSidebar({
  affiliates,
  sticky = false,
  limit = 3,
  className,
}: AffiliateSidebarProps) {
  const t = useTranslations("blog.affiliate");

  if (affiliates.length === 0) {
    return null;
  }

  const displayedAffiliates = affiliates.slice(0, limit);

  return (
    <aside
      className={`space-y-6 ${sticky ? "sticky top-8" : ""} ${className || ""}`}
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {t("recommendedProducts")}
        </h3>
        <div className="space-y-4">
          {displayedAffiliates.map((affiliate) => (
            <AffiliateProductCard
              key={affiliate.id}
              affiliate={affiliate}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
