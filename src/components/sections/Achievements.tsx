"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Award, Trophy, Star, ShieldCheck, Globe, MapPin, ArrowUpRight } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/data/achievements";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AchievementsProps {
  achievements: any[];
  categories: { id: number; name: string; slug: string }[];
}

export default function Achievements({ achievements, categories }: AchievementsProps) {
  const displayAchievements = (achievements && achievements.length > 0) ? achievements : ACHIEVEMENTS_DATA;
  const [selectedScope, setSelectedScope] = useState<string>("Semua");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const getIcon = (scope: string) => {
    switch (scope.toLowerCase()) {
      case "nasional": return Globe;
      case "lokal": return MapPin;
      default: return Trophy;
    }
  };

  const scopeOptions = [
    { id: "Semua", label: "Semua", icon: Trophy },
    { id: "Nasional", label: "Nasional", icon: Globe },
    { id: "Lokal", label: "Lokal", icon: MapPin },
  ];

  const filteredData = displayAchievements.filter(item => {
    return selectedScope === "Semua" ? true : item.scope === selectedScope;
  });

  const getCount = (scopeName: string) => {
    if (scopeName === "Semua") return displayAchievements.length;
    return displayAchievements.filter(a => a.scope === scopeName).length;
  };

  const slideNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % filteredData.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + filteredData.length) % filteredData.length);
  };

  useEffect(() => {
    setCurrent(0);
  }, [selectedScope]);

  useEffect(() => {
    if (filteredData.length <= 1) return;
    const timer = setInterval(slideNext, 8000);
    return () => clearInterval(timer);
  }, [filteredData.length, current]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any // Fix lint: cast to any or use explicit tuple
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      filter: "blur(8px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any
      }
    })
  };

  return (
    <section id="prestasi" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 text-center relative">

        {/* Header - Terpusat seperti Portfolio & Services */}
        <div className="flex flex-col items-center mb-16 px-4 md:px-0">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-primary/10"
          >
            Pencapaian Kami
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-[1.1] tracking-tight text-on-surface"
          >
            Dedikasi & <span className="text-primary">Prestasi.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-on-surface-variant/80 text-lg md:text-xl max-w-xl leading-relaxed font-medium mb-12 tracking-tight"
          >
            Pengakuan nyata atas <span className="text-on-surface">dedikasi dan inovasi</span> standar dunia.
          </motion.p>

          {/* Filter Scopes - Premium Style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center p-2 bg-surface-variant/40 backdrop-blur-xl rounded-[28px] border border-outline/10 gap-2"
          >
            {scopeOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = selectedScope === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedScope(opt.id)}
                  className={cn(
                    "relative px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-500 flex items-center gap-3 z-10",
                    isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeScope"
                      className="absolute inset-0 bg-white shadow-xl shadow-primary/5 rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn("w-4 h-4 transition-transform duration-500", isActive && "scale-110")} />
                  <span>{opt.label}</span>
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full transition-colors duration-500",
                    isActive ? "bg-primary/10 text-primary" : "bg-on-surface-variant/10 text-on-surface-variant"
                  )}>
                    {getCount(opt.id)}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            {filteredData.length > 0 ? (
              <motion.div
                key={`${selectedScope}-${current}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 bg-on-surface rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl shadow-primary/10"
              >
                {/* Image Side */}
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <SafeImage
                    src={filteredData[current]?.image || ""}
                    alt={filteredData[current]?.title || ""}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-on-surface/60 to-transparent" />
                  <div className="absolute top-8 left-8">
                    <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] uppercase tracking-widest">
                      {filteredData[current]?.scope}
                    </div>
                  </div>
                </div>


                {/* Content Side */}
                <div className="p-10 md:p-16 flex flex-col justify-center space-y-8 bg-on-surface relative">

                  {/* Internal Navigation Buttons */}
                  {filteredData.length > 1 && (
                    <div className="absolute top-10 right-10 flex gap-3 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); slidePrev(); }}
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-500 shadow-xl backdrop-blur-md"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); slideNext(); }}
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all duration-500 shadow-xl backdrop-blur-md"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-4 text-primary">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black italic opacity-20">{filteredData[current]?.year}</span>
                    <Badge variant="outline" className="border-primary/20 text-primary/60 text-[9px] font-black uppercase tracking-widest px-3">
                      {filteredData[current]?.category?.name || filteredData[current]?.category}
                    </Badge>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    {filteredData[current]?.title}
                  </h3>

                  <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl line-clamp-4">
                    {filteredData[current]?.description}
                  </p>

                  <div className="pt-4">
                    <Link href={`/prestasi/${filteredData[current]?.id}`}>
                      <button className="group flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] h-12 bg-white/5 hover:bg-primary transition-all duration-500 px-8 rounded-2xl shadow-xl">
                        Lihat Detail <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                    </Link>
                  </div>

                  {/* Progress Dots */}
                  {filteredData.length > 1 && (
                    <div className="flex gap-3 pt-8">
                      {filteredData.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setDirection(i > current ? 1 : -1);
                            setCurrent(i);
                          }}
                          className={cn(
                            "h-1.5 transition-all duration-500 rounded-full",
                            i === current ? "w-12 bg-primary" : "w-2 bg-white/20"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64 bg-on-surface rounded-[40px] border border-white/10 text-white/40 font-bold"
              >
                Belum ada prestasi di kategori ini.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
