import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <Skeleton className="h-4 w-48 bg-white/10 mb-6" />
          <Skeleton className="h-12 w-72 bg-white/10 mb-4" />
          <Skeleton className="h-6 w-96 bg-white/10" />
        </div>
      </div>

      {/* Category Filter Skeleton */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            {/* Search */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-5 w-20 mb-4" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-5 w-24 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-xl" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-5 w-28 mb-4" />
                <Skeleton className="h-2 w-full mb-4 rounded-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Skeleton */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Skeleton className="h-7 w-44 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-10 w-40 rounded-xl" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[4/3]" />
                  <CardContent className="p-5">
                    <Skeleton className="h-5 w-20 rounded-full mb-3" />
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-6 w-28 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-10 w-24 rounded-xl" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
