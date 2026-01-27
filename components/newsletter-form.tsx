"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/contexts/toast-context";
import { isValidEmail } from "@/lib/utils";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      addToast("Vui lòng nhập email", "error");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      addToast("Email không hợp lệ", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call (no backend per user request)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast("Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận tin.", "success");
      setEmail("");
    } catch {
      addToast("Có lỗi xảy ra. Vui lòng thử lại sau.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-2 md:gap-3">
      <Input
        type="email"
        placeholder="Nhập email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 md:h-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-primary flex-1"
        disabled={isSubmitting}
        aria-label="Email đăng ký nhận tin"
      />
      <Button
        type="submit"
        className="h-11 md:h-12 px-4 md:px-6 rounded-xl gap-2 shrink-0"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            Đăng ký
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
