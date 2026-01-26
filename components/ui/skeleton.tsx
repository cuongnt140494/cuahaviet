import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
      {/* Image */}
      <Skeleton className="aspect-[4/3] rounded-none" />
      {/* Content */}
      <CardContent className="p-5 space-y-3">
        {/* Badge */}
        <Skeleton className="h-5 w-24 rounded-full" />
        {/* Title */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <Skeleton className="h-4 w-64 bg-white/10 mb-6" />
          <Skeleton className="h-10 w-96 bg-white/10 mb-4" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-24 bg-white/10 rounded-full" />
            <Skeleton className="h-6 w-24 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
              <Skeleton className="aspect-[4/3]" />
            </Card>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-xl" />
              ))}
            </div>

            {/* Specifications */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <Skeleton className="h-7 w-40 mb-6" />
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 bg-muted/30 rounded-xl">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <Skeleton className="h-7 w-36 mb-6" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden sticky top-[140px]">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
                <Skeleton className="h-10 w-48 bg-white/20" />
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <Skeleton className="h-14 w-full rounded-xl" />
                <div className="flex gap-3">
                  <Skeleton className="h-12 flex-1 rounded-xl" />
                  <Skeleton className="h-12 flex-1 rounded-xl" />
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-36 mb-4" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
