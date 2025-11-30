"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { MediaAsset, ExtendedAffiliateLink } from "@/lib/queries/blog";
import { AffiliateProductCard } from "./affiliate-product-card";

interface RichContentProps {
  content: string;
  mediaAssets?: MediaAsset[];
  affiliateLinks?: ExtendedAffiliateLink[];
}

interface ContentPart {
  type: "html" | "affiliate" | "media";
  content?: string;
  affiliate?: ExtendedAffiliateLink;
  media?: MediaAsset;
}

export function RichContent({
  content,
  mediaAssets = [],
  affiliateLinks = [],
}: RichContentProps) {
  const parts = useMemo(() => {
    const result: ContentPart[] = [];
    const remainingContent = content;
    const sortedAffiliates = [...affiliateLinks].sort(
      (a, b) => (a.position || 0) - (b.position || 0)
    );
    const sortedMedia = [...mediaAssets].sort(
      (a, b) => a.position - b.position
    );

    // Create a map of all placeholders with their positions
    const placeholders: Array<{
      type: "affiliate" | "media";
      id: string;
      position: number;
      data: ExtendedAffiliateLink | MediaAsset;
    }> = [];

    sortedAffiliates.forEach((link) => {
      if (!link.id) return;
      const placeholder = `[affiliate:${link.id}]`;
      const position = remainingContent.indexOf(placeholder);
      if (position !== -1) {
        placeholders.push({
          type: "affiliate",
          id: link.id,
          position,
          data: link as ExtendedAffiliateLink,
        });
      }
    });

    sortedMedia.forEach((asset) => {
      const placeholder = `[media:${asset.id}]`;
      const position = remainingContent.indexOf(placeholder);
      if (position !== -1) {
        placeholders.push({
          type: "media",
          id: asset.id,
          position,
          data: asset,
        });
      }
    });

    // Sort placeholders by position
    placeholders.sort((a, b) => a.position - b.position);

    let lastIndex = 0;
    placeholders.forEach((placeholder) => {
      // Add HTML content before this placeholder
      if (placeholder.position > lastIndex) {
        const htmlContent = remainingContent.substring(
          lastIndex,
          placeholder.position
        );
        if (htmlContent.trim()) {
          result.push({ type: "html", content: htmlContent });
        }
      }

      // Add the placeholder component
      if (placeholder.type === "affiliate") {
        result.push({
          type: "affiliate",
          affiliate: placeholder.data as ExtendedAffiliateLink,
        });
      } else {
        result.push({
          type: "media",
          media: placeholder.data as MediaAsset,
        });
      }

      lastIndex =
        placeholder.position + `[${placeholder.type}:${placeholder.id}]`.length;
    });

    // Add remaining HTML content
    if (lastIndex < remainingContent.length) {
      const htmlContent = remainingContent.substring(lastIndex);
      if (htmlContent.trim()) {
        result.push({ type: "html", content: htmlContent });
      }
    }

    // If no placeholders, return the whole content as HTML
    if (result.length === 0) {
      result.push({ type: "html", content: remainingContent });
    }

    return result;
  }, [content, mediaAssets, affiliateLinks]);

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-img:rounded-lg prose-img:my-8 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-ul:list-disc prose-ol:list-decimal prose-li:my-2">
      {parts.map((part, index) => {
        if (part.type === "html" && part.content) {
          return (
            <div
              key={`html-${index}`}
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        }
        if (part.type === "affiliate" && part.affiliate) {
          return (
            <div key={`affiliate-${part.affiliate.id}`} className="my-8">
              <AffiliateProductCard affiliate={part.affiliate} />
            </div>
          );
        }
        if (part.type === "media" && part.media) {
          if (part.media.type === "image") {
            return (
              <div key={`media-${part.media.id}`} className="my-8">
                <Image
                  src={part.media.url}
                  alt={part.media.alt_text || ""}
                  width={1200}
                  height={600}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            );
          } else if (part.media.type === "video") {
            return (
              <div key={`media-${part.media.id}`} className="my-8">
                <video
                  src={part.media.url}
                  controls
                  className="rounded-lg w-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}
