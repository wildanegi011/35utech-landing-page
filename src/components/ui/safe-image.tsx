"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
}

export default function SafeImage({ fallbackClassName, className, alt, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={cn("absolute inset-0 flex flex-col items-center justify-center bg-slate-100", fallbackClassName)}>
        <ImageOff className="w-10 h-10 text-slate-300 mb-3" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tidak Ada Gambar</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
