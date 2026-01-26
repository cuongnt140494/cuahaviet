"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface CompareContextType {
  items: Product[];
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  clearAll: () => void;
  isInCompare: (productId: string) => boolean;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product): boolean => {
    if (items.length >= MAX_COMPARE_ITEMS) {
      return false;
    }
    if (items.find((item) => item.id === product.id)) {
      return false;
    }
    setItems((prev) => [...prev, product]);
    return true;
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearAll = () => {
    setItems([]);
  };

  const isInCompare = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearAll,
        isInCompare,
        canAdd: items.length < MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
