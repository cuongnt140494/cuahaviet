"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, Loader2, Check, X } from "lucide-react";
import { useToast } from "@/contexts/toast-context";

// Mock valid promo codes for demo
const VALID_PROMO_CODES: Record<string, { discount: number; type: "percent" | "fixed"; description: string }> = {
  CUAHAVIET5: { discount: 5, type: "percent", description: "Giảm 5% đơn hàng" },
  CUAHAVIET10: { discount: 10, type: "percent", description: "Giảm 10% đơn hàng" },
  WELCOME: { discount: 100000, type: "fixed", description: "Giảm 100.000đ" },
  FREESHIP: { discount: 0, type: "fixed", description: "Miễn phí vận chuyển" },
};

interface PromoCodeFormProps {
  onApply?: (code: string, discount: { discount: number; type: "percent" | "fixed"; description: string }) => void;
}

export function PromoCodeForm({ onApply }: PromoCodeFormProps) {
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleApply = async () => {
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedCode) {
      addToast("Vui lòng nhập mã giảm giá", "error");
      return;
    }

    if (trimmedCode.length < 4) {
      addToast("Mã giảm giá phải có ít nhất 4 ký tự", "error");
      return;
    }

    // Check for special characters
    if (!/^[A-Z0-9]+$/.test(trimmedCode)) {
      addToast("Mã giảm giá chỉ được chứa chữ cái và số", "error");
      return;
    }

    if (appliedCode === trimmedCode) {
      addToast("Mã này đã được áp dụng", "info");
      return;
    }

    setIsValidating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const promoData = VALID_PROMO_CODES[trimmedCode];

      if (promoData) {
        setAppliedCode(trimmedCode);
        addToast(`Áp dụng thành công: ${promoData.description}`, "success");
        onApply?.(trimmedCode, promoData);
      } else {
        addToast("Mã giảm giá không hợp lệ hoặc đã hết hạn", "error");
      }
    } catch {
      addToast("Có lỗi xảy ra. Vui lòng thử lại.", "error");
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    setAppliedCode(null);
    setCode("");
    addToast("Đã xóa mã giảm giá", "info");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <Tag className="h-5 w-5 text-amber-600" />
        </div>
        <span className="font-semibold">Mã giảm giá</span>
      </div>

      {appliedCode ? (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
          <Check className="h-5 w-5 text-green-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-green-800">{appliedCode}</p>
            <p className="text-sm text-green-600">
              {VALID_PROMO_CODES[appliedCode]?.description}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="h-8 w-8 rounded-full flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
            aria-label="Xóa mã giảm giá"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Nhập mã giảm giá"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            className="h-12 rounded-xl border-2 focus:border-primary uppercase"
            disabled={isValidating}
            aria-label="Mã giảm giá"
          />
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl"
            onClick={handleApply}
            disabled={isValidating || !code.trim()}
          >
            {isValidating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Áp dụng"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
