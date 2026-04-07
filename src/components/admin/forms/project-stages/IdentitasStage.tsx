"use client";

import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormCombobox } from "../FormCombobox";
import { InfoIcon, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface IdentitasStageProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  categories: any[];
  statuses: any[];
}

const inputClass = "h-12 bg-white border-slate-200 rounded-xl text-sm focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium";
const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2 px-1";

export function IdentitasStage({
  register,
  errors,
  setValue,
  watch,
  categories,
  statuses
}: IdentitasStageProps) {
  const categoryIdValue = watch("categoryId");
  const statusIdValue = watch("statusId");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
      <div className="flex flex-col gap-1 pb-1">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Identitas Dasar Proyek <InfoIcon className="w-5 h-5 text-blue-500" />
        </h3>
        <p className="text-[13px] text-slate-400 font-medium">Lengkapi informasi dasar proyek.</p>
      </div>

      <div className="space-y-6">
        {/* Row 1: Title (Full Emphasis) */}
        <Field className="space-y-2">
          <FieldLabel className={labelClass}>Judul Proyek Utama</FieldLabel>
          <FieldContent>
            <Input 
              {...register("title")} 
              placeholder="Contoh: Sistem Informasi Manajemen Sekolah Terintegrasi" 
              className={inputClass + " text-sm h-12 border-slate-300 focus:border-primary"} 
            />
            <FieldError className="mt-1.5">{errors.title?.message as string}</FieldError>
          </FieldContent>
        </Field>

        {/* Row 2: Client & Year (Balanced Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <Field>
            <FieldLabel className={labelClass}>Klien / Instansi</FieldLabel>
            <FieldContent>
              <Input {...register("client")} placeholder="Contoh: PT. Teknologi Maju" className={inputClass} />
              <FieldError className="mt-1.5">{errors.client?.message as string}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel className={labelClass}>Tahun Publikasi</FieldLabel>
            <FieldContent>
              <Input {...register("year")} placeholder="Contoh: 2025" maxLength={4} className={inputClass} />
              <FieldError className="mt-1.5">{errors.year?.message as string}</FieldError>
            </FieldContent>
          </Field>
        </div>

        {/* Row 3: Category & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <FormCombobox
            label="Kategori Portofolio"
            value={categoryIdValue?.toString()}
            onValueChange={(val: string) => setValue("categoryId", parseInt(val), { shouldValidate: true })}
            options={categories.map((c: any) => ({ label: c.name, value: c.id.toString() }))}
            placeholder="Pilih kategori..."
            searchPlaceholder="Cari kategori..."
            emptyText="Kategori tidak ditemukan."
            error={errors.categoryId?.message as string}
          />
          <FormCombobox
            label="Status Pengerjaan"
            value={statusIdValue?.toString()}
            onValueChange={(val: string) => setValue("statusId", parseInt(val), { shouldValidate: true })}
            options={statuses.map((s: any) => ({ label: s.name, value: s.id.toString() }))}
            placeholder="Pilih status..."
            searchPlaceholder="Cari status..."
            emptyText="Status tidak ditemukan."
            error={errors.statusId?.message as string}
          />
        </div>

        {/* Row 4: Link (Bottom secondary) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-end">
          <Field>
            <FieldLabel className={labelClass}>URL Live Preview / Website (Opsional)</FieldLabel>
            <FieldContent>
              <Input {...register("link")} placeholder="https://domain-proyek.com" className={inputClass} />
              <FieldError className="mt-2">{errors.link?.message as string}</FieldError>
            </FieldContent>
          </Field>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${watch("isPublished") ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                {watch("isPublished") ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Status Visibilitas</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  {watch("isPublished") ? 'Terpublikasi di Landing Page' : 'Masih Draft / Tersembunyi'}
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
    </div>
  );
}
