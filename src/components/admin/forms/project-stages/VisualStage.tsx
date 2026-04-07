"use client";

import React, { useState, useRef } from "react";
import { UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";
import {
  FieldError
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "../ImageUpload";
import { ImageIcon, Plus, Trash2, ChevronLeft, Layout, Loader2, Library } from "lucide-react";
import { toast } from "sonner";

interface VisualStageProps {
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
  galleryFields: any[];
  appendGallery: (value: any) => void;
  removeGallery: (index: number) => void;
  moveGallery: (from: number, to: number) => void;
}

const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1";

export function VisualStage({
  watch,
  setValue,
  errors,
  galleryFields,
  appendGallery,
  removeGallery,
  moveGallery
}: VisualStageProps) {
  const [uploadingBulk, setUploadingBulk] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      // Basic validation
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
        appendGallery(data.url);
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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-10">
      {/* Short Title & Status */}
      <div className="flex flex-col gap-1 pb-1">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Aset Visual & Gambar <ImageIcon className="w-5 h-5 text-pink-500" />
        </h3>
        <p className="text-[13px] text-slate-400 font-medium tracking-tight">Unggah grafis karya Anda.</p>
      </div>

      <div className="space-y-10">
        {/* Simplified Main Cover */}
        <div className="space-y-4">
          <ImageUpload
            value={watch("image")}
            onChange={(url) => setValue("image", url, { shouldValidate: true })}
            onRemove={() => setValue("image", "", { shouldValidate: true })}
            label="Klik untuk Pilih Foto Sampul"
            aspectRatio="aspect-[16/8]"
            className="shadow-2xl ring-1 ring-slate-100"
          />
          <FieldError className="mt-2 text-center">{errors.image?.message as string}</FieldError>
        </div>

        {/* Separator */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4">
              <Layout className="w-4 h-4 text-slate-200 rotate-90" />
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <span className={labelClass + " mb-0"}>Galeri Foto Tambahan</span>
            </div>
            
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
              className="h-9 px-5 rounded-2xl text-[9px] font-black uppercase tracking-widest gap-2 bg-slate-50 border-none transition-all active:scale-95 shadow-sm min-w-[140px]"
            >
              {uploadingBulk ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {uploadProgress.current}/{uploadProgress.total} Selesai...
                </>
              ) : (
                <>
                  <Library className="w-4 h-4" strokeWidth={3} /> Pilih Banyak Foto
                </>
              )}
            </Button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryFields.map((field, index) => (
                <div key={field.id} className="relative group p-3 border border-slate-100 rounded-3xl bg-white transition-all hover:shadow-xl hover:border-primary/20">
                  <ImageUpload
                    value={watch(`gallery.${index}` as any)}
                    onChange={(url) => setValue(`gallery.${index}` as any, url)}
                    onRemove={() => removeGallery(index)}
                    label={`Detail ${index + 1}`}
                    aspectRatio="aspect-square"
                  />
                  {/* Reordering HUD: Left/Right Arrows */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-2 group-hover:translate-y-0">
                    {index > 0 && (
                      <button 
                        type="button" 
                        onClick={() => moveGallery(index, index - 1)}
                        className="w-7 h-7 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all shadow-lg active:scale-90"
                        title="Geser Kiri"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={3} />
                      </button>
                    )}

                    <div className="bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-widest shadow-xl">
                      #{index + 1}
                    </div>

                    {index < galleryFields.length - 1 && (
                      <button 
                        type="button" 
                        onClick={() => moveGallery(index, index + 1)}
                        className="w-7 h-7 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all shadow-lg active:scale-90"
                        title="Geser Kanan"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 rotate-180" strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add Individual Item Placholder while uploading */}
              {uploadingBulk && (
                 <div className="relative p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center opacity-50">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Memproses Upload...</p>
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
