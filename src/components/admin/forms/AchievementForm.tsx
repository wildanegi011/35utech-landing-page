import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { ImageUpload } from "./ImageUpload";
import {
  Award,
  Calendar,
  Globe,
  Type,
  Layout,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  Star,
  Plus,
  Trash2,
  ChevronLeft,
  Loader2,
  Library
} from "lucide-react";
import { Achievement } from "@/hooks/use-achievements";
import { AchievementCategory } from "@/hooks/use-achievement-categories";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SCOPES = ["Lokal", "Nasional"];

const achievementSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  year: z.string().regex(/^\d{4}$/, "Tahun harus 4 digit"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  categoryId: z.number().min(1, "Pilih kategori"),
  scope: z.enum(["Lokal", "Nasional"], "Pilih cakupan"),
  image: z.string().min(1, "Unggah foto sampul"),
  icon: z.string().optional(),
  isPublished: z.boolean(),
  gallery: z.array(z.object({ url: z.string() })).optional(),
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

interface AchievementFormProps {
  initialData?: Partial<Achievement> | null;
  categories: AchievementCategory[];
  onSubmit: (data: AchievementFormValues) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function AchievementForm({ initialData, categories, onSubmit, onCancel, loading }: AchievementFormProps) {
  const [uploadingBulk, setUploadingBulk] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors }
  } = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: initialData?.title || "",
      year: initialData?.year || new Date().getFullYear().toString(),
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || (categories.length > 0 ? categories[0].id : undefined),
      scope: (initialData?.scope as any) || "Nasional",
      image: initialData?.image || "",
      isPublished: initialData?.isPublished ?? false,
      gallery: initialData?.gallery?.map(g => ({ url: g.imageUrl })) || [],
    }
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery, move: moveGallery } = useFieldArray({
    control,
    name: "gallery"
  });

  const scopeValue = watch("scope");

  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingBulk(true);
    setUploadProgress({ current: 0, total: files.length });

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(prev => ({ ...prev, current: i + 1 }));

      if (!file.type.startsWith("image/")) {
        failCount++;
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload gagal");

        const data = await res.json();
        appendGallery({ url: data.url });
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    setUploadingBulk(false);
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (successCount > 0) {
      toast.success(`${successCount} foto berhasil ditambahkan ke galeri`);
    }
    if (failCount > 0) {
      toast.error(`${failCount} foto gagal diunggah`);
    }
  };

  const handleFormSubmit = (data: AchievementFormValues) => {
    const formattedData = {
      ...data,
      gallery: data.gallery?.map(g => g.url) || []
    };
    onSubmit(formattedData as any);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10 py-6 font-sans">
      {/* Header Info Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary shadow-sm border border-blue-100">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-tight">Identitas Utama</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Nama & Tahun Penghargaan</p>
          </div>
        </div>

        <Field>
          <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nama Pencapaian / Penghargaan</FieldLabel>
          <FieldContent className="relative">
            <div className="absolute left-4 top-3.5 text-slate-400">
              <Star className="w-4 h-4" />
            </div>
            <Input {...register("title")} placeholder="Contoh: Best Tech Innovation 2025" className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl pl-11" />
            <FieldError className="mt-1.5">{errors.title?.message}</FieldError>
          </FieldContent>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tahun</FieldLabel>
            <FieldContent className="relative">
              <div className="absolute left-4 top-3.5 text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <Input {...register("year")} placeholder="2025" maxLength={4} className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl pl-11" />
              <FieldError className="mt-1.5">{errors.year?.message}</FieldError>
            </FieldContent>
          </Field>

          <FormCombobox
            label="Cakupan Prestasi"
            value={scopeValue}
            onValueChange={(val) => setValue("scope", val as any, { shouldValidate: true })}
            options={SCOPES}
            placeholder="Pilih cakupan..."
            searchPlaceholder="Cari cakupan..."
            emptyText="Cakupan tidak ditemukan."
            icon={Globe}
            error={errors.scope?.message}
          />
        </div>
      </div>


      {/* Gallery Section */}
      <div className="space-y-6 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 shadow-sm border border-pink-100">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-tight">Dokumentasi Visual</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Galeri & Bukti Pencapaian</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleMultipleUpload}
              accept="image/*"
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploadingBulk}
              onClick={() => fileInputRef.current?.click()}
              className="h-9 px-5 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 bg-slate-50 border-none transition-all active:scale-95 shadow-sm"
            >
              {uploadingBulk ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {uploadProgress.current}/{uploadProgress.total} Selesai...
                </>
              ) : (
                <>
                  <Library className="w-4 h-4 text-primary" strokeWidth={3} /> Unggah Banyak
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-4">
          <Field>
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Foto Sampul Utama (Wajib)</FieldLabel>
            <FieldContent>
              <ImageUpload
                value={watch("image")}
                onChange={(url) => setValue("image", url, { shouldValidate: true })}
                onRemove={() => setValue("image", "", { shouldValidate: true })}
                label="Klik untuk Unggah Sampul Utama"
                aspectRatio="aspect-video"
                className="shadow-2xl shadow-indigo-500/10 ring-1 ring-slate-100 mb-2"
              />
              <FieldError className="mt-1.5">{errors.image?.message}</FieldError>
            </FieldContent>
          </Field>
        </div>

        {galleryFields.length === 0 && !uploadingBulk ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50/20 cursor-pointer group hover:bg-white hover:border-primary/40 transition-all"
          >
            <ImageIcon className="w-6 h-6 text-slate-300 mb-3 group-hover:text-primary transition-colors" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-primary">Klik untuk Menambah Galeri</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {galleryFields.map((field: any, index: number) => (
              <div key={field.id} className="relative group p-2 border border-slate-100 rounded-2xl bg-white transition-all hover:shadow-xl hover:border-primary/20">
                <ImageUpload
                  value={field.url}
                  onChange={(url) => setValue(`gallery.${index}.url` as any, url)}
                  onRemove={() => removeGallery(index)}
                  label={`Detail ${index + 1}`}
                  aspectRatio="aspect-square"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-2 group-hover:translate-y-0">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveGallery(index, index - 1)}
                      className="w-6 h-6 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all shadow-lg"
                    >
                      <ChevronLeft className="w-3 h-3" strokeWidth={3} />
                    </button>
                  )}
                  <div className="bg-slate-900/80 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[7px] font-black text-white uppercase tracking-widest">
                    #{index + 1}
                  </div>
                  {index < galleryFields.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveGallery(index, index + 1)}
                      className="w-6 h-6 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all shadow-lg"
                    >
                      <ChevronLeft className="w-3 h-3 rotate-180" strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {uploadingBulk && (
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center opacity-50 aspect-square">
                <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                <p className="text-[8px] font-black text-primary uppercase tracking-widest text-center px-2">Uploading...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categorization & Visual */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 leading-tight">Kategori & Deskripsi</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Kategori & Detail Deskripsi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormCombobox
            label="Kategori"
            value={watch("categoryId")?.toString()}
            onValueChange={(val) => setValue("categoryId", parseInt(val), { shouldValidate: true })}
            options={categories.map(c => ({ label: c.name, value: c.id.toString() }))}
            placeholder="Pilih kategori..."
            searchPlaceholder="Cari kategori..."
            emptyText="Kategori tidak ditemukan."
            icon={Award}
            error={errors.categoryId?.message}
          />
        </div>
        <Field>
          <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Deskripsi Detail</FieldLabel>
          <FieldContent>
            <Textarea {...register("description")} placeholder="Jelaskan signifikansi dari pencapaian ini..." rows={5} className="bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl p-4 min-h-[150px]" />
            <FieldError className="mt-1.5">{errors.description?.message}</FieldError>
          </FieldContent>
        </Field>
      </div>

      {/* Status & Visibility */}
      <div className="pt-2 border-t border-slate-100/60">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
              watch("isPublished") ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'
            )}>
              {watch("isPublished") ? <Star className="w-5 h-5 fill-emerald-600/20" /> : <Star className="w-5 h-5" />}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 leading-tight">Visibilitas Publik</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                {watch("isPublished") ? 'Ditampilkan di Etalase Utama' : 'Masih Draft / Tersembunyi'}
              </span>
            </div>
          </div>
          <Switch
            checked={watch("isPublished")}
            onCheckedChange={(checked) => setValue("isPublished", checked, { shouldValidate: true })}
            className="data-[state=checked]:bg-emerald-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-primary" />
          Periksa kembali data sebelum menyimpan
        </p>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="h-12 px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-colors"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl shadow-primary/20 transition-all border-none"
          >
            {loading ? "Menyimpan..." : "Simpan Prestasi"}
          </Button>
        </div>
      </div>
    </form>
  );
}
