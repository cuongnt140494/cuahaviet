"use client";

import { ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { ToastProvider } from "./toast-context";
import { CompareProvider } from "./compare-context";
import { QuickViewProvider } from "./quick-view-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <CompareProvider>
          <QuickViewProvider>{children}</QuickViewProvider>
        </CompareProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export { useCart } from "./cart-context";
export { useToast } from "./toast-context";
export { useCompare } from "./compare-context";
export { useQuickView } from "./quick-view-context";
