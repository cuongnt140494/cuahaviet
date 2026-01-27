"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Maximize2 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // If no images provided, show placeholder
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  }, [displayImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isZoomed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIsZoomed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed, handlePrevious, handleNext]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Placeholder/Image */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-muted-foreground cursor-pointer transition-transform duration-300",
            isHovering && "scale-105"
          )}
          onClick={() => setIsZoomed(true)}
        >
          {/* Product Image Placeholder - Beautiful SVG */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-white">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 font-medium">{productName}</p>
              <p className="text-xs text-slate-300 mt-1">Click để xem chi tiết</p>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/0 transition-all duration-300 pointer-events-none",
          isHovering && "bg-black/5"
        )} />

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="h-5 w-5 text-slate-700" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Phóng to"
        >
          <Maximize2 className="h-5 w-5 text-slate-700" />
        </button>

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/90 shadow-lg text-xs font-medium text-slate-700">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 border-2 transition-all duration-200 hover:scale-105",
                selectedIndex === index
                  ? "border-primary shadow-lg shadow-primary/20"
                  : "border-transparent hover:border-slate-300"
              )}
              aria-label={`Xem ảnh ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
            >
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={selectedIndex === index ? "text-primary" : "text-slate-300"}
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            onClick={() => setIsZoomed(false)}
            aria-label="Đóng xem ảnh"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation in Modal */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>
            </>
          )}

          {/* Zoomed Image Placeholder */}
          <div
            className="max-w-5xl max-h-[85vh] w-full mx-4 aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-3xl bg-slate-700/50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="96"
                  height="96"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-500"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <p className="text-lg text-slate-400 font-medium">{productName}</p>
              <p className="text-sm text-slate-500 mt-2">Ảnh {selectedIndex + 1} / {displayImages.length}</p>
            </div>
          </div>

          {/* Thumbnails in Modal */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-xl backdrop-blur-sm">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    selectedIndex === index
                      ? "bg-white scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Xem ảnh ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Keyboard hint */}
          <div className="absolute bottom-6 right-6 text-xs text-white/40">
            Sử dụng ← → để di chuyển • ESC để đóng
          </div>
        </div>
      )}
    </div>
  );
}
