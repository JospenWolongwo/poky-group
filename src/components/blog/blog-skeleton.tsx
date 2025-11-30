import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BlogCardSkeleton() {
  return (
    <Card className="h-full border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div className="relative h-48 w-full bg-muted animate-pulse" />
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-6 w-full bg-muted rounded animate-pulse mb-2" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-muted rounded-full animate-pulse" />
        </div>
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

export function ArticleSkeleton() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="relative h-64 md:h-96 w-full bg-muted rounded-lg animate-pulse mb-8" />
      <div className="space-y-4 mb-8">
        <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
      </div>
    </article>
  );
}


