"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ConfirmModal({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  variant = "danger",
  isLoading = false,
  confirmLabel = "Konfirmasi Hapus",
  cancelLabel = "Batal",
}: ConfirmModalProps) {
  const variantStyles = {
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200",
    warning: "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200",
    info: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20",
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[400px] bg-white rounded-2xl border border-slate-200/50 shadow-xl p-6 overflow-hidden font-sans">
        <div className="space-y-6">
          <AlertDialogHeader className="text-left flex flex-col items-start gap-4">
            <div className={cn(
              "p-2.5 rounded-xl w-fit",
              variant === "danger" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
            )}>
              <AlertCircle className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <AlertDialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium text-sm leading-relaxed">
                {description}
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex sm:flex-row gap-2 pt-2 border-t-0">
            <AlertDialogCancel className="h-10 px-4 rounded-lg font-bold text-xs border-slate-200 bg-white hover:bg-slate-50 transition-colors w-full sm:w-auto">
              {cancelLabel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
              disabled={isLoading}
              className={cn(
                "h-10 px-4 rounded-lg font-bold text-xs transition-all w-full sm:w-auto shadow-sm",
                variantStyles[variant]
              )}
            >
              {isLoading ? "Memproses..." : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
