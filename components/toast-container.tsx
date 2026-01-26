"use client";

import { useToast } from "@/contexts/toast-context";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl animate-in slide-in-from-right-full duration-300 min-w-[280px] max-w-[400px] ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              : toast.type === "error"
              ? "bg-gradient-to-r from-red-600 to-rose-600 text-white"
              : "bg-gradient-to-r from-slate-800 to-slate-700 text-white"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
            {toast.type === "success" && <CheckCircle className="h-5 w-5" />}
            {toast.type === "error" && <XCircle className="h-5 w-5" />}
            {toast.type === "info" && <Info className="h-5 w-5" />}
          </div>
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1.5 rounded-lg hover:bg-white/20 opacity-70 hover:opacity-100 transition-all"
            aria-label="Đóng thông báo"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
