"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { ExtendedAffiliateLink } from "@/lib/queries/blog";

interface AffiliateProductCardProps {
  readonly affiliate: ExtendedAffiliateLink;
  readonly imageUrl?: string;
  readonly rating?: number;
  readonly price?: string;
  readonly badge?: "best-value" | "popular" | "editors-choice" | null;
  readonly className?: string;
}

export function AffiliateProductCard({
  affiliate,
  imageUrl,
  rating,
  price,
  badge,
  className,
}: AffiliateProductCardProps) {
  const t = useTranslations("blog.affiliate");

  const productName = affiliate.title || affiliate.product || "";
  const productDescription = affiliate.description || "";
  const vendor = affiliate.vendor || "";
  const targetUrl = affiliate.target_url || "";
  const cta = affiliate.cta || t("viewDeal");

  // Use database fields if available, otherwise fall back to props
  const productImageUrl = imageUrl || affiliate.image_url || "";
  const productRating = rating !== undefined ? rating : affiliate.rating;
  const productPrice = price || affiliate.price || "";
  const productBadge = badge || affiliate.badge || null;

  const badgeLabels = {
    "best-value": t("bestValue"),
    popular: t("popularChoice"),
    "editors-choice": t("editorsPick"),
  };

  const renderStars = (ratingValue: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(ratingValue)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all hover:shadow-lg ${
        className || ""
      }`}
    >
      {productBadge && (
        <div className="absolute top-4 right-4 z-10">
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground"
          >
            {badgeLabels[productBadge as keyof typeof badgeLabels]}
          </Badge>
        </div>
      )}

      {productImageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={productImageUrl}
            alt={productName}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <CardHeader>
        {vendor && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {vendor}
          </p>
        )}
        <h3 className="text-lg font-semibold leading-tight">{productName}</h3>
        {productDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {productDescription}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {productRating !== undefined && productRating !== null && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(Number(productRating))}
            </div>
            <span className="text-sm text-muted-foreground">
              {Number(productRating).toFixed(1)}
            </span>
          </div>
        )}

        {productPrice && (
          <div className="text-xl font-bold text-primary">{productPrice}</div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          asChild
          className="w-full"
          onClick={() => {
            if (affiliate.tracking_code) {
              // Track affiliate click if needed
              console.log("Affiliate click tracked:", affiliate.id);
            }
          }}
        >
          <Link
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-center gap-2"
          >
            {cta}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>

      <div className="px-6 pb-4">
        <p className="text-xs text-muted-foreground text-center">
          {t("affiliateDisclosure")}
        </p>
      </div>
    </Card>
  );
}
