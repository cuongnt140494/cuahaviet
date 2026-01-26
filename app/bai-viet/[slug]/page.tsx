import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/data/posts";
import { postCategoryLabels } from "@/types";
import { siteConfig } from "@/lib/seo-config";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  ChevronRight,
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Share2,
  BookOpen,
  Sparkles,
  Phone,
  ArrowRight,
} from "lucide-react";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
      description: "Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  const title = `${post.title} | Cửa Hà Việt`;
  const description = post.excerpt;

  return {
    title,
    description,
    keywords: `${postCategoryLabels[post.category]}, cửa cuốn Austdoor, ${post.title}`,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteConfig.url}/bai-viet/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/bai-viet/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <>
      {/* Structured Data */}
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${siteConfig.url}/bai-viet/${post.slug}`}
        datePublished={post.publishedAt}
        dateModified={post.publishedAt}
        author={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Bài viết", url: "/bai-viet" },
          { name: post.title, url: `/bai-viet/${post.slug}` },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/bai-viet" className="hover:text-white transition-colors">Bài viết</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-white/10 text-white border-0 rounded-full">
                {postCategoryLabels[post.category]}
              </Badge>
              {post.featured && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 rounded-full">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Nổi bật
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} phút đọc
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Featured Image Placeholder */}
            <Card className="border-0 shadow-xl overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-slate-300" />
              </div>
            </Card>

            {/* Content */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {post.content.split("\n").map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Headers
                    if (trimmed.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                          {trimmed.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (trimmed.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
                          {trimmed.replace("### ", "")}
                        </h3>
                      );
                    }

                    // Bold text
                    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                      return (
                        <p key={index} className="font-semibold mb-2 text-foreground">
                          {trimmed.replace(/\*\*/g, "")}
                        </p>
                      );
                    }

                    // List items
                    if (trimmed.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-4 mb-2 text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{trimmed.replace("- ", "")}</span>
                        </li>
                      );
                    }

                    // Numbered list items
                    if (/^\d+\.\s/.test(trimmed)) {
                      return (
                        <li key={index} className="ml-4 mb-2 text-muted-foreground list-decimal">
                          {trimmed.replace(/^\d+\.\s/, "")}
                        </li>
                      );
                    }

                    // Table headers
                    if (trimmed.startsWith("|") && trimmed.includes("---")) {
                      return null;
                    }

                    // Table rows
                    if (trimmed.startsWith("|")) {
                      const cells = trimmed
                        .split("|")
                        .filter((cell) => cell.trim())
                        .map((cell) => cell.trim());
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-3 gap-2 py-3 border-b text-sm"
                        >
                          {cells.map((cell, i) => (
                            <span key={i} className="text-muted-foreground">{cell}</span>
                          ))}
                        </div>
                      );
                    }

                    // Regular paragraphs
                    return (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Share & Navigation */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/bai-viet">
                <Button variant="outline" className="rounded-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Quay lại danh sách
                </Button>
              </Link>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Chia sẻ:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
                  <h3 className="font-bold text-white">Bài viết liên quan</h3>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/bai-viet/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="w-20 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-slate-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(relatedPost.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl mb-2">Cần tư vấn?</h3>
                <p className="text-sm text-white/80 mb-4">
                  Liên hệ ngay để được tư vấn miễn phí về cửa cuốn Austdoor
                </p>
                <a href="tel:0919086272">
                  <Button variant="secondary" className="w-full rounded-xl gap-2">
                    0919 086 272
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </Card>

            {/* Browse Products */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Khám phá sản phẩm</h3>
                <p className="text-sm text-white/70 mb-4">
                  Xem các dòng cửa cuốn Austdoor chính hãng
                </p>
                <Link href="/san-pham">
                  <Button className="w-full rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 gap-2">
                    Xem sản phẩm
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>
        </div>
        </div>
      </div>
    </>
  );
}
