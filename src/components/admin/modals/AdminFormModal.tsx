"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface AdminFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
}

export function AdminFormModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  className,
  badge = "Editor",
}: AdminFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "sm:max-w-2xl bg-white p-0 gap-0 overflow-hidden rounded-[32px] border-none shadow-2xl", 
          className
        )}
      >
        {/* 
          WE USE A WRAPPER DIV WITH FLEX-COL AND MAX-H
          This ensures that children like ScrollArea (flex-1) know exactly how much space is left.
        */}
        <div className="flex flex-col max-h-[90vh] w-full origin-top">
          
          {/* Sticky Header - SHRINK-0 keeps it visible */}
          <div className="relative z-50 bg-white border-b border-slate-100 px-8 py-5 shrink-0">
            <DialogHeader className="text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/5 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">{badge}</span>
              </div>
              <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">
                {title}
                <span className="text-primary italic">.</span>
              </DialogTitle>
              {description && (
                <DialogDescription className="text-slate-400 font-bold text-[10px] leading-relaxed uppercase tracking-widest">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>

          {/* 
              SCROLL AREA - Now a direct child of the flex wrapper.
              min-h-0 allows it to shrink below its content's intrinsic height,
              which triggers the scrollbars when it hits the flex container's limit.
          */}
          <ScrollArea className="flex-1 min-h-0 w-full bg-slate-50/20">
            <div className="p-8 pt-4">
              {children}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
