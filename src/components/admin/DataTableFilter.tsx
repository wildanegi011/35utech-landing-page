"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableFilterProps {
  title: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DataTableFilter({
  title,
  options,
  value,
  onChange,
  className,
}: DataTableFilterProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-12 justify-between bg-white border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm px-4",
              className
            )}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : title}
            </span>
            <ChevronDown className={cn(
              "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-300",
              open ? "rotate-180" : ""
            )} />
          </Button>
        }
      />
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0 rounded-xl overflow-hidden border-slate-200 shadow-xl shadow-slate-200/50">
        <Command className="bg-white">
          <CommandInput placeholder={`Cari ${title.toLowerCase()}...`} />
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Tidak ditemukan
            </CommandEmpty>
            <CommandGroup className="p-1">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "all" : currentValue);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <div className={cn(
                    "flex-1 transition-colors",
                    value === option.value ? "text-primary" : ""
                  )}>
                    {option.label}
                  </div>
                  {value === option.value && (
                    <Check className="h-3.5 w-3.5 text-primary stroke-3" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
