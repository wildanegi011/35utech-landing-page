"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImagePlus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  className?: string;
  label?: string;
  aspectRatio?: string;
}

export function ImageUpload({ value, onChange, onRemove, className, label = "Pilih Gambar", aspectRatio = "aspect-video" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      onChange(data.url);
      toast.success("Gambar berhasil diperbarui");
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      setUploading(true);
      const res = await fetch(`/api/admin/upload?url=${encodeURIComponent(value)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus file");
      
      onRemove();
      toast.success("Gambar berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus file di server");
      // Tetap onRemove jika terjadi kesalahan agar UI sinkron
      onRemove(); 
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("relative w-full group overflow-hidden rounded-[24px] transition-all", aspectRatio, className)}>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
      />

      {/* State: Empty / No Image */}
      {!value ? (
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          className="w-full h-full border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Mengunggah...</span>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                <Upload className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="text-center space-y-1">
                <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">{label}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Klik atau Taruh File</p>
              </div>
            </>
          )}
        </div>
      ) : (
        /* State: Image Selected (Full Preview) */
        <div className="relative w-full h-full bg-slate-100">
          <img 
            src={value} 
            alt="Upload Preview" 
            className="w-full h-full object-cover" 
          />

          {/* Hover Overlay: Premium Glassmorphism Effect */}
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-500 flex flex-col items-center justify-center p-4">
            {uploading ? (
               <div className="flex flex-col items-center gap-2">
                 <Loader2 className="w-8 h-8 text-white animate-spin" />
                 <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Sinkronisasi...</span>
               </div>
            ) : (
              <>
                {/* Main Action: Change Image */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95 translate-y-4 group-hover:translate-y-0 duration-500"
                >
                  <RefreshCw className="w-3.5 h-3.5" strokeWidth={3} /> Ubah Gambar
                </button>
                
                {/* Secondary Action: Delete (Top Right) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="absolute top-3 right-3 p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all backdrop-blur-xl shadow-xl active:scale-90 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500"
                  title="Hapus Gambar"
                >
                  <X className="w-4 h-4" strokeWidth={3} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
