"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ExternalLink, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ExtendedAffiliateLink } from "@/lib/queries/blog";

interface AffiliateComparisonProps {
  readonly affiliates: ExtendedAffiliateLink[];
  readonly features?: Array<{
    readonly name: string;
    readonly values: Record<string, string | boolean>;
  }>;
  readonly className?: string;
}

export function AffiliateComparison({
  affiliates,
  features = [],
  className,
}: AffiliateComparisonProps) {
  const t = useTranslations("blog.affiliate");
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState<number | null>(
    null
  );

  if (affiliates.length === 0) {
    return null;
  }

  const toggleMobileView = (index: number) => {
    setMobileSelectedIndex(mobileSelectedIndex === index ? null : index);
  };

  return (
    <section className={`py-8 ${className || ""}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("compareProducts")}</h2>
        <p className="text-muted-foreground">
          {t("compareProductsDescription")}
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">
                      {t("product")}
                    </th>
                    {affiliates.map((affiliate) => (
                      <th
                        key={affiliate.id}
                        className="text-center p-4 font-semibold min-w-[200px]"
                      >
                        <div className="space-y-2">
                          <div className="font-bold">
                            {affiliate.title || affiliate.product}
                          </div>
                          {affiliate.vendor && (
                            <div className="text-sm text-muted-foreground">
                              {affiliate.vendor}
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-4 font-medium">{feature.name}</td>
                      {affiliates.map((affiliate) => {
                        const value = feature.values[affiliate.id] ?? "";
                        const isBoolean = typeof value === "boolean";
                        return (
                          <td key={affiliate.id} className="text-center p-4">
                            {isBoolean ? (
                              value ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{String(value)}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 font-medium">{t("action")}</td>
                    {affiliates.map((affiliate) => (
                      <td key={affiliate.id} className="p-4">
                        <Button asChild className="w-full" size="sm">
                          <a
                            href={affiliate.target_url || ""}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="flex items-center justify-center gap-2"
                          >
                            {affiliate.cta || t("viewDeal")}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Accordion View */}
      <div className="md:hidden space-y-4">
        {affiliates.map((affiliate, index) => (
          <Card key={affiliate.id}>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleMobileView(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {affiliate.title || affiliate.product}
                  </h3>
                  {affiliate.vendor && (
                    <p className="text-sm text-muted-foreground">
                      {affiliate.vendor}
                    </p>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    mobileSelectedIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CardHeader>
            {mobileSelectedIndex === index && (
              <CardContent className="space-y-4">
                {features.map((feature, idx) => {
                  const value = feature.values[affiliate.id] ?? "";
                  const isBoolean = typeof value === "boolean";
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{feature.name}</span>
                      {isBoolean ? (
                        value ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        <span className="text-sm">{String(value)}</span>
                      )}
                    </div>
                  );
                })}
                <Button asChild className="w-full mt-4">
                  <a
                    href={affiliate.target_url || ""}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-2"
                  >
                    {affiliate.cta || t("viewDeal")}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        {t("affiliateDisclosure")}
      </div>
    </section>
  );
}
