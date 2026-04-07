"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormCombobox } from "./FormCombobox";
import {
  Code2,
  Layout,
  Zap,
  Shield,
  Cpu,
  BarChart3,
  Globe2,
  Smartphone,
  Search,
  Mail,
  MessageSquare,
  Monitor,
  Briefcase,
  Layers,
  Settings,
  Activity,
  HardDrive,
  Cloud,
  Type,
  FileText,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_OPTIONS = [
  { label: "Code (Development)", value: "Code2", icon: Code2 },
  { label: "Layout (UI/UX Design)", value: "Layout", icon: Layout },
  { label: "Zap (Optimization)", value: "Zap", icon: Zap },
  { label: "Shield (Security)", value: "Shield", icon: Shield },
  { label: "CPU (Infrastructure)", value: "Cpu", icon: Cpu },
  { label: "Bar Chart (Analytics)", value: "BarChart3", icon: BarChart3 },
  { label: "Globe (Web / Network)", value: "Globe2", icon: Globe2 },
  { label: "Smartphone (Mobile App)", value: "Smartphone", icon: Smartphone },
  { label: "Search (SEO / Finding)", value: "Search", icon: Search },
  { label: "Mail (Communications)", value: "Mail", icon: Mail },
  { label: "Message (Chat / Social)", value: "MessageSquare", icon: MessageSquare },
  { label: "Monitor (Desktop)", value: "Monitor", icon: Monitor },
  { label: "Briefcase (Business)", value: "Briefcase", icon: Briefcase },
  { label: "Layers (Architecture)", value: "Layers", icon: Layers },
  { label: "Settings (Internal)", value: "Settings", icon: Settings },
  { label: "Activity (Performance)", value: "Activity", icon: Activity },
  { label: "Hard Drive (Storage)", value: "HardDrive", icon: HardDrive },
  { label: "Cloud (SaaS / Cloud)", value: "Cloud", icon: Cloud },
];

const serviceSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  icon: z.string().min(1, "Pilih ikon"),
  image: z.string().url("URL gambar tidak valid").or(z.literal("")),
  categoryId: z.number().int("Pilih kategori"),
  isPublished: z.boolean(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  initialData?: any;
  categories: { label: string; value: string }[];
  onSubmit: (data: ServiceFormValues) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ServiceForm({ initialData, categories, onSubmit, onCancel, loading }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      icon: initialData?.icon || "Code2",
      image: initialData?.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
      categoryId: initialData?.categoryId || 1,
      isPublished: initialData?.isPublished ?? false,
    }
  });

  const iconValue = watch("icon");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-none">Detail Layanan</h3>
        </div>

        <Field>
          <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nama Layanan</FieldLabel>
          <FieldContent className="relative">
            <div className="absolute left-4 top-3.5 text-slate-400">
              <Type className="w-4 h-4" />
            </div>
            <Input {...register("title")} placeholder="Contoh: Rekayasa Perangkat Lunak" className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl pl-11 font-medium" />
            <FieldError className="mt-1.5">{errors.title?.message}</FieldError>
          </FieldContent>
        </Field>

        <FormCombobox
          label="Ikon Visual"
          value={iconValue}
          onValueChange={(val) => setValue("icon", val, { shouldValidate: true })}
          options={ICON_OPTIONS}
          placeholder="Pilih ikon..."
          searchPlaceholder="Cari ikon..."
          emptyText="Ikon tidak ditemukan."
          icon={Sparkles}
          error={errors.icon?.message}
        />

        <Field>
          <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Deskripsi Layanan</FieldLabel>
          <FieldContent className="relative">
            <div className="absolute left-4 top-3.5 text-slate-400">
              <FileText className="w-4 h-4" />
            </div>
            <Textarea {...register("description")} placeholder="Jelaskan proposisi nilai dari layanan ini..." className="min-h-[120px] bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl pl-11 pt-3 font-medium resize-none" />
            <FieldError className="mt-1.5">{errors.description?.message}</FieldError>
          </FieldContent>
        </Field>

        <FormCombobox
          label="Kategori Layanan"
          value={watch("categoryId").toString()}
          onValueChange={(val) => setValue("categoryId", parseInt(val), { shouldValidate: true })}
          options={categories}
          placeholder="Pilih kategori..."
          searchPlaceholder="Cari kategori..."
          emptyText="Kategori tidak ditemukan."
          icon={Layers}
          error={errors.categoryId?.message}
        />

        {/* New Row: Image URL & Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-end">
          {/* <Field>
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">URL Gambar Sampul</FieldLabel>
            <FieldContent className="relative">
              <Input {...register("image")} placeholder="https://unsplash..." className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl font-medium" />
              <FieldError className="mt-1.5">{errors.image?.message}</FieldError>
            </FieldContent>
          </Field> */}

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                watch("isPublished") ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'
              )}>
                {watch("isPublished") ? <Sparkles className="w-4 h-4" /> : <Sparkles className="w-4 h-4 opacity-40" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-tight">Visibilitas Publik</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  {watch("isPublished") ? 'Tampil di Menu Layanan' : 'Masih Draft / Tersembunyi'}
                </span>
              </div>
            </div>
            <Switch
              checked={watch("isPublished")}
              onCheckedChange={(checked) => setValue("isPublished", checked, { shouldValidate: true })}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] text-slate-500 hover:bg-slate-100 transition-all"
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200 transition-all disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Layanan"}
        </Button>
      </div>
    </form>
  );
}
