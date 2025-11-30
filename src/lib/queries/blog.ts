import { supabase } from "../supabase";
import type { Database } from "../supabase";

type BlogPost = Database["public"]["Tables"]["posts"]["Row"];
type BlogPostTranslation =
  Database["public"]["Tables"]["post_translations"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type CategoryTranslation =
  Database["public"]["Tables"]["category_translations"]["Row"];
export type Author = Database["public"]["Tables"]["authors"]["Row"];
type Tag = Database["public"]["Tables"]["tags"]["Row"];
type TagTranslation = Database["public"]["Tables"]["tag_translations"]["Row"];
export type AffiliateLink =
  Database["public"]["Tables"]["affiliate_links"]["Row"];
export type MediaAsset = Database["public"]["Tables"]["media_assets"]["Row"];

// Extended AffiliateLink type with all optional fields properly typed
export type ExtendedAffiliateLink = Omit<
  AffiliateLink,
  "image_url" | "rating" | "price" | "badge"
> & {
  image_url?: string | null;
  rating?: number | null;
  price?: string | null;
  badge?: "best-value" | "popular" | "editors-choice" | null;
};

// Type for raw Supabase response with nested relations
interface SupabasePostResponse {
  id: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  category_id: string | null;
  author: string;
  cover_image_url: string | null;
  post_translations: Array<BlogPostTranslation> | BlogPostTranslation;
  categories?: {
    id: string;
    slug: string;
    label: string;
    category_translations?: Array<CategoryTranslation> | CategoryTranslation;
  } | null;
  post_tags?: Array<{
    tags: {
      id: string;
      slug: string;
      label: string;
      tag_translations?: Array<TagTranslation> | TagTranslation;
    };
  }> | null;
  affiliate_links?: AffiliateLink[] | null;
  media_assets?: MediaAsset[] | null;
}

export type BlogPostWithTranslation = Omit<
  BlogPost,
  "category_id" | "published_at" | "updated_at" | "cover_image_url" | "author"
> & {
  id: string; // Explicitly include id to ensure TypeScript recognizes it
  category_id?: string | null; // Explicitly include category_id from posts table
  published_at?: string | null; // Explicitly include published_at from posts table
  updated_at?: string | null; // Explicitly include updated_at from posts table
  slug: string; // Explicitly include slug from posts table
  cover_image_url?: string | null; // Explicitly include cover_image_url from posts table
  author?: string | Author; // Can be string (author name) or Author object
  translation: BlogPostTranslation;
  category?: Category & { translation?: CategoryTranslation };
  tags?: Array<Tag & { translation?: TagTranslation }>;
};

export interface BlogPostFull extends BlogPostWithTranslation {
  affiliate_links?: ExtendedAffiliateLink[];
  media_assets?: MediaAsset[];
}

export async function getAllPosts(
  locale: string
): Promise<BlogPostWithTranslation[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_translations!inner(
        *,
        locale
      ),
      categories(
        *,
        category_translations(
          *
        )
      ),
      post_tags(
        tags(
          *,
          tag_translations(
            *
          )
        )
      )
    `
    )
    .eq("post_translations.locale", locale)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  if (!data) return [];

  return data.map((post: SupabasePostResponse) => {
    const translation = Array.isArray(post.post_translations)
      ? post.post_translations.find(
          (t: BlogPostTranslation) => t.locale === locale
        ) || post.post_translations[0]
      : post.post_translations;

    const categoryTranslation = post.categories?.category_translations
      ? Array.isArray(post.categories.category_translations)
        ? post.categories.category_translations.find(
            (t: CategoryTranslation) => t.locale === locale
          ) || post.categories.category_translations[0]
        : post.categories.category_translations
      : undefined;

    return {
      ...post,
      translation,
      category: post.categories
        ? {
            ...post.categories,
            translation: categoryTranslation,
          }
        : undefined,
      author: post.author || undefined,
      tags:
        post.post_tags?.map(
          (bpt: {
            tags: {
              id: string;
              slug: string;
              label: string;
              tag_translations?: Array<TagTranslation> | TagTranslation;
            };
          }) => {
            const tagTranslation = bpt.tags?.tag_translations
              ? Array.isArray(bpt.tags.tag_translations)
                ? bpt.tags.tag_translations.find(
                    (t: TagTranslation) => t.locale === locale
                  ) || bpt.tags.tag_translations[0]
                : bpt.tags.tag_translations
              : undefined;
            return {
              ...bpt.tags,
              translation: tagTranslation,
            };
          }
        ) || [],
    };
  });
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPostFull | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_translations!inner(*),
      categories(
        *,
        category_translations(*)
      ),
      post_tags(
        tags(
          *,
          tag_translations(*)
        )
      ),
      affiliate_links(*),
      media_assets(*)
    `
    )
    .eq("slug", slug)
    .eq("post_translations.locale", locale)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .single();

  if (error || !data) {
    console.error("Error fetching post by slug:", error);
    return null;
  }

  // Filter category and tag translations by locale in JavaScript
  const categoryTranslation = data.categories?.category_translations
    ? Array.isArray(data.categories.category_translations)
      ? data.categories.category_translations.find(
          (t: CategoryTranslation) => t.locale === locale
        )
      : data.categories.category_translations.locale === locale
      ? data.categories.category_translations
      : undefined
    : undefined;

  // Fetch author by name if author is a string
  let authorData: Author | undefined = undefined;
  if (data.author && typeof data.author === "string") {
    const { data: author } = await supabase
      .from("authors")
      .select("*")
      .eq("name", data.author)
      .single();
    if (author) {
      authorData = author;
    }
  }

  return {
    ...data,
    translation: data.post_translations[0],
    category: data.categories
      ? {
          ...data.categories,
          translation: categoryTranslation,
        }
      : undefined,
    author: authorData || data.author || undefined,
    tags:
      data.post_tags?.map(
        (bpt: {
          tags: {
            id: string;
            slug: string;
            label: string;
            tag_translations?: Array<TagTranslation> | TagTranslation;
          };
        }) => {
          const tagTranslation = bpt.tags?.tag_translations
            ? Array.isArray(bpt.tags.tag_translations)
              ? bpt.tags.tag_translations.find(
                  (t: TagTranslation) => t.locale === locale
                )
              : bpt.tags.tag_translations.locale === locale
              ? bpt.tags.tag_translations
              : undefined
            : undefined;
          return {
            ...bpt.tags,
            translation: tagTranslation,
          };
        }
      ) || [],
    affiliate_links: data.affiliate_links || [],
    media_assets: data.media_assets || [],
  };
}

export async function getPostsByCategory(
  locale: string,
  categorySlug: string
): Promise<BlogPostWithTranslation[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_translations!inner(*),
      categories!inner(
        *,
        category_translations(*)
      ),
      post_tags(
        tags(
          *,
          tag_translations(*)
        )
      )
    `
    )
    .eq("categories.slug", categorySlug)
    .eq("post_translations.locale", locale)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }

  if (!data) return [];

  return data.map((post: SupabasePostResponse) => {
    const categoryTranslation = post.categories?.category_translations
      ? Array.isArray(post.categories.category_translations)
        ? post.categories.category_translations.find(
            (t: CategoryTranslation) => t.locale === locale
          )
        : post.categories.category_translations.locale === locale
        ? post.categories.category_translations
        : undefined
      : undefined;

    return {
      ...post,
      translation: Array.isArray(post.post_translations)
        ? post.post_translations[0]
        : post.post_translations,
      category: post.categories
        ? {
            ...post.categories,
            translation: categoryTranslation,
          }
        : undefined,
      author: post.author || undefined,
      tags:
        post.post_tags?.map((bpt) => {
          const tagTranslation = bpt.tags?.tag_translations
            ? Array.isArray(bpt.tags.tag_translations)
              ? bpt.tags.tag_translations.find(
                  (t: TagTranslation) => t.locale === locale
                )
              : bpt.tags.tag_translations.locale === locale
              ? bpt.tags.tag_translations
              : undefined
            : undefined;
          return {
            ...bpt.tags,
            translation: tagTranslation,
          };
        }) || [],
    };
  });
}

export async function getPostsByTag(
  locale: string,
  tagSlug: string
): Promise<BlogPostWithTranslation[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_translations!inner(*),
      categories(
        *,
        category_translations(*)
      ),
      post_tags!inner(
        tags!inner(
          *,
          tag_translations(*)
        )
      )
    `
    )
    .eq("tags.slug", tagSlug)
    .eq("post_translations.locale", locale)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by tag:", error);
    return [];
  }

  if (!data) return [];

  return data.map((post: SupabasePostResponse) => {
    const categoryTranslation = post.categories?.category_translations
      ? Array.isArray(post.categories.category_translations)
        ? post.categories.category_translations.find(
            (t: CategoryTranslation) => t.locale === locale
          )
        : post.categories.category_translations.locale === locale
        ? post.categories.category_translations
        : undefined
      : undefined;

    return {
      ...post,
      translation: Array.isArray(post.post_translations)
        ? post.post_translations[0]
        : post.post_translations,
      category: post.categories
        ? {
            ...post.categories,
            translation: categoryTranslation,
          }
        : undefined,
      author: post.author || undefined,
      tags:
        post.post_tags?.map((bpt) => {
          const tagTranslation = bpt.tags?.tag_translations
            ? Array.isArray(bpt.tags.tag_translations)
              ? bpt.tags.tag_translations.find(
                  (t: TagTranslation) => t.locale === locale
                )
              : bpt.tags.tag_translations.locale === locale
              ? bpt.tags.tag_translations
              : undefined
            : undefined;
          return {
            ...bpt.tags,
            translation: tagTranslation,
          };
        }) || [],
    };
  });
}

export async function getPostsByAuthor(
  locale: string,
  authorName: string
): Promise<BlogPostWithTranslation[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_translations!inner(*),
      categories(
        *,
        category_translations(*)
      ),
      post_tags(
        tags(
          *,
          tag_translations(*)
        )
      )
    `
    )
    .eq("author", authorName)
    .eq("post_translations.locale", locale)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by author:", error);
    return [];
  }

  if (!data) return [];

  return data.map((post: SupabasePostResponse) => {
    const categoryTranslation = post.categories?.category_translations
      ? Array.isArray(post.categories.category_translations)
        ? post.categories.category_translations.find(
            (t: CategoryTranslation) => t.locale === locale
          )
        : post.categories.category_translations.locale === locale
        ? post.categories.category_translations
        : undefined
      : undefined;

    return {
      ...post,
      translation: Array.isArray(post.post_translations)
        ? post.post_translations[0]
        : post.post_translations,
      category: post.categories
        ? {
            ...post.categories,
            translation: categoryTranslation,
          }
        : undefined,
      author: post.author || undefined,
      tags:
        post.post_tags?.map((bpt) => {
          const tagTranslation = bpt.tags?.tag_translations
            ? Array.isArray(bpt.tags.tag_translations)
              ? bpt.tags.tag_translations.find(
                  (t: TagTranslation) => t.locale === locale
                )
              : bpt.tags.tag_translations.locale === locale
              ? bpt.tags.tag_translations
              : undefined
            : undefined;
          return {
            ...bpt.tags,
            translation: tagTranslation,
          };
        }) || [],
    };
  });
}

export async function getRelatedPosts(
  locale: string,
  categoryId: string | null,
  postId: string,
  limit: number = 3
): Promise<BlogPostWithTranslation[]> {
  if (!categoryId) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_translations!inner(*),
      categories(
        *,
        category_translations(*)
      ),
      post_tags(
        tags(
          *,
          tag_translations(*)
        )
      )
    `
    )
    .eq("category_id", categoryId)
    .neq("id", postId)
    .eq("post_translations.locale", locale)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  if (!data) return [];

  return data.map((post: SupabasePostResponse) => {
    const categoryTranslation = post.categories?.category_translations
      ? Array.isArray(post.categories.category_translations)
        ? post.categories.category_translations.find(
            (t: CategoryTranslation) => t.locale === locale
          )
        : post.categories.category_translations.locale === locale
        ? post.categories.category_translations
        : undefined
      : undefined;

    return {
      ...post,
      translation: Array.isArray(post.post_translations)
        ? post.post_translations[0]
        : post.post_translations,
      category: post.categories
        ? {
            ...post.categories,
            translation: categoryTranslation,
          }
        : undefined,
      author: post.author || undefined,
      tags:
        post.post_tags?.map((bpt) => {
          const tagTranslation = bpt.tags?.tag_translations
            ? Array.isArray(bpt.tags.tag_translations)
              ? bpt.tags.tag_translations.find(
                  (t: TagTranslation) => t.locale === locale
                )
              : bpt.tags.tag_translations.locale === locale
              ? bpt.tags.tag_translations
              : undefined
            : undefined;
          return {
            ...bpt.tags,
            translation: tagTranslation,
          };
        }) || [],
    };
  });
}

export async function getAllCategories(
  locale: string
): Promise<Array<Category & { translation?: CategoryTranslation }>> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      category_translations!inner(*)
    `
    )
    .eq("category_translations.locale", locale);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  if (!data) return [];

  return data.map((category) => ({
    ...category,
    translation: Array.isArray(category.category_translations)
      ? category.category_translations[0]
      : category.category_translations,
  }));
}

export async function getAllTags(
  locale: string
): Promise<Array<Tag & { translation?: TagTranslation }>> {
  const { data, error } = await supabase
    .from("tags")
    .select(
      `
      *,
      tag_translations!inner(*)
    `
    )
    .eq("tag_translations.locale", locale);

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  if (!data) return [];

  return data.map((tag) => ({
    ...tag,
    translation: Array.isArray(tag.tag_translations)
      ? tag.tag_translations[0]
      : tag.tag_translations,
  }));
}

export async function getAllAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching authors:", error);
    return [];
  }

  return data || [];
}

export async function getCategoryBySlug(
  locale: string,
  slug: string
): Promise<(Category & { translation?: CategoryTranslation }) | null> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      category_translations!inner(*)
    `
    )
    .eq("slug", slug)
    .eq("category_translations.locale", locale)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    translation: data.category_translations?.[0],
  };
}

export async function getTagBySlug(
  locale: string,
  slug: string
): Promise<(Tag & { translation?: TagTranslation }) | null> {
  const { data, error } = await supabase
    .from("tags")
    .select(
      `
      *,
      tag_translations!inner(*)
    `
    )
    .eq("slug", slug)
    .eq("tag_translations.locale", locale)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    translation: data.tag_translations?.[0],
  };
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getFeaturedAffiliateProducts(
  limit: number = 5
): Promise<ExtendedAffiliateLink[]> {
  const { data, error } = await supabase
    .from("affiliate_links")
    .select("*")
    .eq("featured", true)
    .order("position", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured affiliate products:", error);
    return [];
  }

  return data || [];
}

export async function getAffiliateProductsByCategory(
  categoryId: string,
  limit: number = 5
): Promise<ExtendedAffiliateLink[]> {
  const { data, error } = await supabase
    .from("affiliate_links")
    .select(
      `
      *,
      posts!inner(
        category_id
      )
    `
    )
    .eq("posts.category_id", categoryId)
    .order("position", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching affiliate products by category:", error);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item,
    post_id: (item as { posts?: { id?: string } }).posts?.id,
  }));
}

export async function getAffiliateProductsByPost(
  postId: string
): Promise<ExtendedAffiliateLink[]> {
  const { data, error } = await supabase
    .from("affiliate_links")
    .select("*")
    .eq("post_id", postId)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching affiliate products by post:", error);
    return [];
  }

  return data || [];
}
