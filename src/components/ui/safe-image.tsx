"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
  onLoad?: () => void;
}

export default function SafeImage({ fallbackClassName, className, alt, onLoad, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !props.src) {
    return (
      <div className={cn("absolute inset-0 flex flex-col items-center justify-center bg-slate-50 border border-slate-100", fallbackClassName)}>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-200 shadow-inner">
          <ImageOff className="w-5 h-5 opacity-40 shrink-0" />
        </div>
      </div>
    );
  }

  const isLocal = typeof props.src === "string" && (props.src.startsWith("/") || props.src.includes("localhost") || props.src.includes("127.0.0.1"));

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      sizes={props.fill && !props.sizes ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : props.sizes}
      unoptimized={isLocal || props.unoptimized}
      onLoad={onLoad}
      onError={() => setHasError(true)}
    />
  );
}
