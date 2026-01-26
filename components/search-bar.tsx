"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { categoryLabels } from "@/types";
import { searchMatch } from "@/lib/utils";

interface SearchBarProps {
  onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const filtered = products.filter(
        (p) =>
          searchMatch(p.name, query) ||
          searchMatch(p.description, query) ||
          searchMatch(categoryLabels[p.category], query) ||
          searchMatch(p.specifications.model, query)
      );
      setResults(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = () => {
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <Input
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4"
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              <ul className="py-2">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/san-pham/${product.slug}`}
                      onClick={handleSelect}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {categoryLabels[product.category]}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {formatPrice(product.price)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t px-4 py-2">
                <Link
                  href={`/san-pham?search=${encodeURIComponent(query)}`}
                  onClick={handleSelect}
                  className="text-sm text-primary hover:underline"
                >
                  Xem tất cả kết quả cho &quot;{query}&quot;
                </Link>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
