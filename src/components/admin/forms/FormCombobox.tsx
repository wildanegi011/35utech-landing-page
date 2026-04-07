"use client";

import * as React from "react";
import { Check, ChevronDown, LucideIcon } from "lucide-react";
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
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

interface FormComboboxOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface FormComboboxProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: (string | FormComboboxOption)[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  icon?: LucideIcon;
  error?: string;
}

export function FormCombobox({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  icon: Icon,
  error,
}: FormComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const normalizedOptions = options.map((opt) => 
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  return (
    <Field>
      <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
        {label}
      </FieldLabel>
      <FieldContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                className="h-12 w-full justify-between bg-slate-50/50 border-slate-200 hover:bg-white hover:border-primary/30 transition-all rounded-xl px-4 font-bold text-slate-700 text-sm shadow-none"
              />
            }
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {selectedOption?.icon ? (
                <selectedOption.icon className="w-4 h-4 text-primary shrink-0" />
              ) : (
                Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
          </PopoverTrigger>
          <PopoverContent 
            className="w-full p-2 border border-slate-200/40 bg-white rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden" 
            align="start"
            sideOffset={8}
          >
            <Command className="bg-transparent border-none ring-0">
              <div className="px-1 pt-1 pb-2">
                <CommandInput 
                  placeholder={searchPlaceholder} 
                  className="h-10 text-[11px] font-bold bg-slate-100/50 border-none rounded-xl placeholder:text-slate-400 placeholder:font-medium" 
                />
              </div>
              <CommandList className="max-h-[280px] no-scrollbar">
                <CommandEmpty className="py-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                  {emptyText}
                </CommandEmpty>
                <CommandGroup className="px-1">
                  {normalizedOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        onValueChange(option.value === value ? "" : option.value);
                        setOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-600 data-[selected=true]:bg-blue-50 data-[selected=true]:text-primary transition-all cursor-pointer mb-1 last:mb-0 group"
                    >
                    <div className="flex items-center gap-3">
                      {option.icon && <option.icon className="w-4 h-4 text-slate-400 group-data-[selected=true]:text-primary shrink-0 transition-colors" />}
                      <span>{option.label}</span>
                    </div>
                      <Check
                        className={cn(
                          "h-4 w-4 text-primary transition-all",
                          value === option.value ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <FieldError className="mt-1.5">{error}</FieldError>}
      </FieldContent>
    </Field>
  );
}
