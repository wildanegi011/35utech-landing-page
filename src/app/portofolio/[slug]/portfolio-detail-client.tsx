"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  CheckCircle2,
  Target,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  Layout,
  Smartphone,
  Globe,
  Database,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/ui/safe-image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PortfolioDetailClientProps {
  project: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any
    },
  },
};

export default function PortfolioDetailClient({ project }: PortfolioDetailClientProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollY } = useScroll();

  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]);
  const headerBorder = useTransform(scrollY, [0, 50], ["rgba(0, 0, 0, 0)", "rgba(15, 23, 42, 0.04)"]);
  const headerText = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 1)", "rgba(15, 23, 42, 1)"]);

  const galleryImages = project.gallery?.map((g: any) => g.imageUrl) || [];
  const techStack = project.techStack || [];
  const features = project.features || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Helper to find relevant tech icons
  const getTechIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("next")) return <Zap className="w-5 h-5" />;
    if (n.includes("react") || n.includes("native")) return <Smartphone className="w-5 h-5" />;
    if (n.includes("tail")) return <Layout className="w-5 h-5" />;
    if (n.includes("node") || n.includes("express")) return <Cpu className="w-5 h-5" />;
    if (n.includes("db") || n.includes("sql") || n.includes("mongo")) return <Database className="w-5 h-5" />;
    return <Code2 className="w-5 h-5" />;
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 selection:bg-primary/10">
      {/* Header Dinamis */}
      <motion.header
        style={{ backgroundColor: headerBg, borderColor: headerBorder }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.button
            style={{ color: headerText }}
            onClick={() => router.push("/#portofolio")}
            className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-opacity hover:opacity-70 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 transition-all group-hover:scale-110">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Kembali</span>
          </motion.button>

          <div className="flex items-center gap-4">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
                  Lihat Live <ExternalLink className="ml-2 w-3.5 h-3.5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Immersive Cinematic */}
      <section className="relative h-[65vh] flex items-end overflow-hidden bg-slate-950">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <SafeImage
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 text-primary">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{project.category?.name || "Proyek Unggulan"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.95] uppercase max-w-4xl">
              {project.title}<span className="text-primary italic">.</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Flow */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
          >
            {/* Left Column: Core Narrative */}
            <div className="lg:col-span-8 space-y-20">

              {/* Overview Section */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 text-primary">
                  <Layers className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Ringkasan Eksekutif</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Misi & Visi Proyek<span className="text-primary italic">.</span></h2>
                <p className="text-slate-600 text-lg leading-[1.8] font-medium">
                  {project.longDescription}
                </p>
              </motion.div>

              {/* Challenges & Solution Grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Target,
                    title: "Tantangan Utama",
                    content: project.challenge,
                    color: "text-rose-500",
                    bg: "bg-rose-50",
                    border: "border-rose-100"
                  },
                  {
                    icon: Lightbulb,
                    title: "Solusi Strategis",
                    content: project.solution,
                    color: "text-emerald-500",
                    bg: "bg-emerald-50",
                    border: "border-emerald-100"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "group p-10 rounded-[42px] border transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 bg-white",
                      item.border
                    )}
                  >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3", item.bg, item.color)}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {item.content}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Enhanced Visual Showcase */}
              {galleryImages.length > 0 && (
                <motion.div variants={itemVariants} className="space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-primary">
                        <div className="h-px w-8 bg-primary" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Desain Pengalaman</span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Galeri Visual Produk<span className="text-primary italic">.</span></h3>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={prevSlide} className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button onClick={nextSlide} className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="relative aspect-video rounded-[48px] overflow-hidden bg-slate-200 shadow-2xl shadow-primary/10 border border-slate-100 group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <SafeImage src={galleryImages[currentSlide]} alt="Visual Showcase" fill className="object-cover" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gallery Navigation Overlay Dots */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10 px-8 py-4 bg-slate-900/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
                      {galleryImages.map((_: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={cn(
                            "h-2 transition-all duration-500 rounded-full",
                            i === currentSlide ? "w-12 bg-primary" : "w-2.5 bg-white/30 hover:bg-white/50"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Premium Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-36 h-fit space-y-10">

              {/* Technical Profile Card */}
              <motion.div variants={itemVariants} className="p-8 rounded-[36px] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Data Proyek</h4>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Spesifikasi Teknis</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { icon: User, label: "Mitra Klien", value: project.client },
                    { icon: Calendar, label: "Tahun Rilis", value: project.year },
                    { icon: Globe, label: "Status Produksi", value: project.status?.name || "Live" }
                  ].map((item, i) => (
                    <div key={i} className="group p-5 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-primary/20 hover:shadow-md">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-2 pl-1">{item.label}</p>
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Icon-Based Tech Stack List - Light Version */}
              {techStack.length > 0 && (
                <motion.div variants={itemVariants} className="p-8 rounded-[36px] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -mr-16 -mt-16" />

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Teknologi Utama</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    {techStack.map((tech: any, i: number) => (
                      <div key={i} className="group flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-primary/20 hover:shadow-md">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                          {tech.icon ? (
                            <div className="relative w-4 h-4">
                              <SafeImage src={tech.icon} alt={tech.name} fill className="object-contain" />
                            </div>
                          ) : getTechIcon(tech.name)}
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 tracking-tight">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}


            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
