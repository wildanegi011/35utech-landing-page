"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Globe,
  MapPin,
  Trophy,
  Award,
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AchievementDetailClientProps {
  achievement: any;
}

export default function AchievementDetailClient({ achievement }: AchievementDetailClientProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollY } = useScroll();

  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]);
  const headerBorder = useTransform(scrollY, [0, 50], ["rgba(0, 0, 0, 0)", "rgba(15, 23, 42, 0.06)"]);
  const headerText = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 1)", "rgba(15, 23, 42, 1)"]);

  const galleryImages = achievement.gallery || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getScopeIcon = (scope: string) => {
    return scope?.toLowerCase() === "nasional" ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="relative min-h-screen bg-white selection:bg-primary/10">
      {/* Header Dinamis */}
      <motion.header
        style={{ backgroundColor: headerBg, borderColor: headerBorder }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <motion.button
            style={{ color: headerText }}
            onClick={() => router.push("/#prestasi")}
            className="flex items-center gap-2 font-bold text-sm transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </motion.button>

          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black uppercase tracking-widest px-3 py-1">
            {achievement.category?.name || "Prestasi"}
          </Badge>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end overflow-hidden bg-on-surface">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={achievement.image}
            alt={achievement.title}
            fill
            sizes="100vw"
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-on-surface via-on-surface/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-white/60">
              <div className="h-px w-10 bg-primary" />
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.4em]">
                <Trophy className="w-4 h-4 text-primary" />
                <span>Pencapaian {achievement.year}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase max-w-5xl">
              {achievement.title}<span className="text-primary italic">.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Narrative Content */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Deskripsi Pencapaian</span>
                </div>
                <p className="text-on-surface text-xl md:text-xl leading-[1.6] font-normal tracking-tight">
                  {achievement.description}
                </p>

              </motion.div>

              {/* Visual Showcase */}
              {galleryImages.length > 0 && (
                <div className="space-y-10 pt-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-primary">
                        <div className="h-px w-6 bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Timeline Visual</span>
                      </div>
                      <h3 className="text-2xl font-black text-on-surface tracking-tight uppercase">Dokumentasi Moment<span className="text-primary italic">.</span></h3>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={prevSlide} className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={nextSlide} className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-video rounded-[40px] overflow-hidden bg-slate-50 shadow-2xl shadow-primary/5 border border-slate-100">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                      >
                        <SafeImage
                          src={galleryImages[currentSlide].imageUrl}
                          alt="Achievement Gallery"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10 px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                      {galleryImages.map((_: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={cn(
                            "h-1.5 transition-all rounded-full",
                            i === currentSlide ? "w-12 bg-primary" : "w-2.5 bg-white/40"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
              <div className="p-8 rounded-[40px] bg-slate-50/50 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -mr-16 -mt-16" />

                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Detail Teknis
                </h4>

                <div className="space-y-6">
                  <div className="group space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Tahun Pencapaan</p>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 group-hover:border-primary/30 transition-all shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <p className="text-lg font-black text-slate-900">{achievement.year}</p>
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Cakupan Wilayah</p>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 group-hover:border-primary/30 transition-all shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        {getScopeIcon(achievement.scope)}
                      </div>
                      <p className="text-lg font-black text-slate-900">{achievement.scope}</p>
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Kategori Utama</p>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 group-hover:border-primary/30 transition-all shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <Star className="w-5 h-5" />
                      </div>
                      <p className="text-lg font-black text-slate-900">{achievement.category?.name || "General Award"}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer-lite is assumed to be part of global layout or main page */}
    </div>
  );
}
