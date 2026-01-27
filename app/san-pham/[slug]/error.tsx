"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Home, RefreshCw } from "lucide-react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Không thể tải sản phẩm</h1>
        <p className="text-muted-foreground mb-6">
          Đã có lỗi khi tải thông tin sản phẩm. Vui lòng thử lại hoặc xem các sản phẩm khác.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Thử lại
          </Button>
          <Link href="/san-pham">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Package className="h-4 w-4" />
              Xem sản phẩm khác
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
