"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SafeImage from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";
import { Project } from "@/data/portfolio";

interface ImagePreviewModalProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImagePreviewModal({
  project,
  isOpen,
  onOpenChange,
}: ImagePreviewModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const images = project ? [project.image, ...(project.gallery || [])].filter(Boolean) : [];

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setIsZoomed(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
    setIsLoading(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
    setIsLoading(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="fixed! inset-0! translate-x-0! translate-y-0! w-screen! h-screen! max-w-none! p-0! bg-white/80! backdrop-blur-2xl! border-none! shadow-none! ring-0! outline-none! overflow-hidden! m-0! rounded-none! z-100">
            <DialogHeader className="hidden">
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>Premium Light Preview</DialogDescription>
            </DialogHeader>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full flex flex-col font-sans"
            >
              {/* Top Bar - Glass Header */}
              <div className="absolute top-0 inset-x-0 h-24 px-8 flex items-center justify-between z-50 pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                  <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary shadow-xl">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-1">Visual Preview</span>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{project.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 pointer-events-auto">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-slate-100 shadow-md",
                      isZoomed ? "bg-primary text-white" : "bg-white/60 text-slate-600 hover:bg-white"
                    )}
                  >
                    <Maximize2 className={cn("w-5 h-5", isZoomed && "scale-110")} />
                  </button>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="w-12 h-12 rounded-2xl bg-red-50 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-all border border-red-100 active:scale-95 shadow-md"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 relative flex items-center justify-center p-6 md:p-12 lg:p-20 overflow-hidden">
                {/* Loading Spinner */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-40 bg-white/20 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className={cn(
                      "relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      isZoomed ? "scale-110" : "scale-100"
                    )}
                  >
                    <div className="absolute inset-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden bg-white/50 group">
                      <SafeImage
                        src={images[activeIndex]}
                        alt={project.title}
                        fill
                        className={cn(
                          "object-contain transition-opacity duration-500",
                          isLoading ? "opacity-0" : "opacity-100"
                        )}
                        onLoad={() => setIsLoading(false)}
                        priority
                      />
                      {/* Interactive Light Effect */}
                      <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Navigation Controls */}
                {images.length > 1 && (
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                    <motion.button
                      whileHover={{ x: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrev}
                      className="w-16 h-16 rounded-[24px] bg-white/40 hover:bg-white backdrop-blur-md border border-white/20 text-slate-900 flex items-center justify-center transition-all pointer-events-auto shadow-xl group"
                    >
                      <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      className="w-16 h-16 rounded-[24px] bg-white/40 hover:bg-white backdrop-blur-md border border-white/20 text-slate-900 flex items-center justify-center transition-all pointer-events-auto shadow-xl group"
                    >
                      <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Bottom Dock - Floating Thumbnails */}
              <div className="h-32 px-8 pb-10 flex items-center justify-center z-50">
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="px-6 py-4 bg-white/40 backdrop-blur-2xl border border-white/20 rounded-[32px] flex items-center gap-4 shadow-2xl"
                >
                  <div className="hidden sm:flex flex-col border-r border-slate-200 pr-6 mr-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Index</span>
                    <span className="text-sm font-black text-slate-900 tabular-nums">
                      {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
                      <span className="text-slate-200 mx-1.5">/</span>
                      {images.length < 10 ? `0${images.length}` : images.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar max-w-2xl px-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={cn(
                          "relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-500 shrink-0",
                          activeIndex === idx
                            ? "border-primary ring-4 ring-primary/20 scale-110 shadow-lg"
                            : "border-transparent opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                        )}
                      >
                        <SafeImage src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
