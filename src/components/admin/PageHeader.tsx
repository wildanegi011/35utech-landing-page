import React from "react";
import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({ 
  title, 
  description, 
  icon: Icon, 
  actionLabel, 
  onAction 
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 items-center justify-center text-primary shrink-0 group hover:scale-110 transition-all duration-500">
          <Icon className="w-7 h-7 stroke-[2.5]" />
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">
            {title}<span className="text-slate-900">.</span>
          </h1>
          <p className="text-slate-500/80 font-medium text-xs md:text-sm max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl px-8 h-12 shadow-[0_4px_12px_-4px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-0.5 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 mr-2.5 stroke-3" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
