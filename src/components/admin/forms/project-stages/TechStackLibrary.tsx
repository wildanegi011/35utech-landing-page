"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import SafeImage from "@/components/ui/safe-image";
import { Library, Search } from "lucide-react";
import { useTechStacks, TechStack as AvailableTech } from "@/hooks/use-tech-stacks";

interface TechStackLibraryProps {
  onSelect: (tech: AvailableTech) => void;
  selectedTechNames?: string[];
}

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TechStackLibrary({ onSelect, selectedTechNames = [] }: TechStackLibraryProps) {
  const { data: stacks = [], isLoading } = useTechStacks();
  const [search, setSearch] = React.useState("");

  const filtered = stacks.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 bg-slate-50 border-none hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm"
        )}
      >
        <Library className="w-4 h-4" /> Dari Library
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 rounded-[28px] border border-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden" align="end">
        <div className="p-4 bg-slate-50/50 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cari item di library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-10 text-[11px] bg-white border-slate-200 rounded-xl font-medium focus:ring-primary/5 focus:border-primary/20 transition-all shadow-none"
            />
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto p-2 scroll-premium">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memuat...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-300">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-[10px] font-bold uppercase tracking-widest italic">Tidak ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 p-1">
              {filtered.map((tech) => {
                const isSelected = selectedTechNames.includes(tech.name);
                return (
                  <button
                    key={tech.id}
                    type="button"
                    disabled={isSelected}
                    onClick={() => onSelect(tech)}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all text-left bg-white border border-transparent 
                      ${isSelected ? 'opacity-40 grayscale-[0.5] cursor-not-allowed' : 'hover:bg-slate-50 hover:border-slate-100 group'}`}
                  >
                    <div className={`relative w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1.5 shadow-sm transition-all shrink-0
                      ${!isSelected && 'group-hover:shadow-md group-hover:border-primary/30'}`}>
                      <SafeImage src={tech.icon || ""} alt={tech.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[10px] font-black truncate transition-all ${isSelected ? 'text-slate-400' : 'text-slate-900 group-hover:text-primary'}`}>
                        {tech.name}
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                        {isSelected ? 'Terpilih' : 'Tech Stack'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
