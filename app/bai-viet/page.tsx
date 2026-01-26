"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllPosts, getPostsByCategory } from "@/data/posts";
import { PostCategory, postCategoryLabels } from "@/types";
import {
  Search,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Tag,
  ChevronRight,
  Sparkles,
  Calendar,
  Eye,
} from "lucide-react";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categories: { value: PostCategory | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "huong-dan", label: "Hướng dẫn" },
  { value: "tin-tuc", label: "Tin tức" },
  { value: "kien-thuc", label: "Kiến thức" },
  { value: "bao-tri", label: "Bảo trì" },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allPosts = selectedCategory === "all" ? getAllPosts() : getPostsByCategory(selectedCategory);
  const posts = searchQuery
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPosts;

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Bài viết</span>
          </nav>
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tin tức & Kiến thức
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              Chia sẻ kiến thức, hướng dẫn sử dụng và tin tức mới nhất về cửa cuốn Austdoor
            </p>
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className={`shrink-0 rounded-full ${
                  selectedCategory === category.value ? "" : "hover:bg-primary/5"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <Card className="max-w-lg mx-auto border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-12 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-6">
                  <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Không tìm thấy bài viết</h2>
                <p className="text-muted-foreground mb-8">
                  Không có bài viết nào phù hợp với tìm kiếm của bạn
                </p>
                <Button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                  className="rounded-full gap-2"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Post */}
                {featuredPost && (
                  <Link href={`/bai-viet/${featuredPost.slug}`}>
                    <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all group">
                      <div className="grid md:grid-cols-2">
                        <div className="aspect-video md:aspect-auto md:min-h-[300px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                          <BookOpen className="h-20 w-20 text-white/20" />
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Nổi bật
                          </Badge>
                        </div>
                        <CardContent className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="rounded-full">
                              {postCategoryLabels[featuredPost.category]}
                            </Badge>
                          </div>
                          <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {featuredPost.title}
                          </h2>
                          <p className="text-muted-foreground mb-6 line-clamp-2">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {featuredPost.author}
                            </span>
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(featuredPost.publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {featuredPost.readingTime} phút
                            </span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {regularPosts.map((post) => (
                    <Link key={post.id} href={`/bai-viet/${post.slug}`}>
                      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden">
                          <BookOpen className="h-12 w-12 text-slate-300" />
                          {post.featured && (
                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                              Nổi bật
                            </Badge>
                          )}
                          <div className="absolute bottom-3 right-3">
                            <Badge variant="secondary" className="rounded-full bg-white/90 text-foreground">
                              {postCategoryLabels[post.category]}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {post.readingTime} phút đọc
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Popular Posts */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp className="h-5 w-5" />
                      <h3 className="font-bold">Bài viết phổ biến</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {posts.slice(0, 5).map((post, index) => (
                        <Link
                          key={post.id}
                          href={`/bai-viet/${post.slug}`}
                          className="flex gap-3 group"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tags Cloud */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">Chủ đề</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Cửa cuốn", "Motor", "Bảo trì", "Lắp đặt", "An toàn", "Tiết kiệm", "Bảo hành", "Kỹ thuật"].map(
                        (tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors"
                          >
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                    <h3 className="font-bold text-lg mb-2">Đăng ký nhận tin</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Nhận bài viết mới nhất qua email
                    </p>
                    <div className="space-y-3">
                      <Input
                        placeholder="Email của bạn"
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                      />
                      <Button variant="secondary" className="w-full h-12 rounded-xl gap-2">
                        Đăng ký ngay
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* CTA Card */}
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white text-center">
                    <h3 className="font-bold text-lg mb-2">Cần tư vấn?</h3>
                    <p className="text-sm text-white/70 mb-4">
                      Liên hệ ngay để được tư vấn miễn phí về cửa cuốn Austdoor
                    </p>
                    <a href="tel:0919086272">
                      <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                        0919 086 272
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
