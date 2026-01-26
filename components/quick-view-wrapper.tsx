"use client";

import { useQuickView } from "@/contexts";
import { QuickViewModal } from "./quick-view-modal";

export function QuickViewWrapper() {
  const { product, isOpen, closeQuickView } = useQuickView();

  return (
    <QuickViewModal
      product={product}
      isOpen={isOpen}
      onClose={closeQuickView}
    />
  );
}
