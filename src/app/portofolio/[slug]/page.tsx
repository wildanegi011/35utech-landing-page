"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  CheckCircle2,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/ui/safe-image";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useState, useRef } from "react";

export default function PortfolioDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const project = PORTFOLIO_DATA.find((p) => p.slug === slug);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerBg = useTransform(scrollYProgress, [0, 0.05], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);
  const headerBorder = useTransform(scrollYProgress, [0, 0.05], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"]);
  const headerText = useTransform(scrollYProgress, [0, 0.05], ["rgba(255, 255, 255, 1)", "rgba(15, 23, 42, 1)"]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-black text-on-surface mb-4 tracking-tight">Proyek Tidak Ditemukan</h1>
          <p className="text-on-surface-variant mb-8 font-medium">Maaf, kami tidak dapat menemukan proyek yang Anda cari.</p>
          <Button onClick={() => router.push("/#portofolio")} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl px-8 py-4 h-auto shadow-xl shadow-primary/20 transition-all">
            Kembali ke Portofolio
          </Button>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-primary/10">
      {/* Header Dinamis */}
      <motion.header
        style={{ backgroundColor: headerBg, borderColor: headerBorder }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <motion.button
            style={{ color: headerText }}
            onClick={() => router.push("/#portofolio")}
            className="flex items-center gap-2 font-bold text-sm transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Portofolio</span>
          </motion.button>

          <motion.div
            style={{ color: headerText }}
            className="hidden md:block text-sm font-black uppercase tracking-[0.2em] opacity-40"
          >
            Detail Proyek
          </motion.div>

          <div className="flex items-center gap-4">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-5">
                  Lihat Live <ExternalLink className="ml-2 w-3 h-3" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-end overflow-hidden bg-on-surface">
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
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-on-surface via-on-surface/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] border border-primary/30 mb-6">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-4">{word}</span>
              ))}
              <span className="text-primary">.</span>
            </h1>
            <p className="text-white/70 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Area Konten Utama */}
      <section className="max-w-7xl mx-auto px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

          {/* Kolom Kiri: Narasi */}
          <div className="lg:col-span-7 space-y-24">

            {/* Ringkasan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 text-primary">
                <div className="h-px w-8 bg-primary/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ringkasan</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-on-surface tracking-tight">Deskripsi Proyek</h2>
              <p className="text-on-surface-variant text-lg leading-[1.8] font-medium">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Grid Tantangan & Solusi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-on-surface">Tantangan</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-on-surface">Solusi Kami</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {/* Galeri Slider Produk */}
            {galleryImages.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-on-surface tracking-tight">Galeri Produk</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={prevSlide}
                      className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="relative aspect-video rounded-[32px] overflow-hidden bg-surface-variant">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <SafeImage
                        src={galleryImages[currentSlide]}
                        alt={`Galeri ${currentSlide + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Indikator Slider */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Kolom Kanan: Sidebar (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">

              {/* Metadata Proyek */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[32px] bg-white border border-outline/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-10"
              >
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Informasi Proyek</h4>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Klien</p>
                        <p className="font-bold text-on-surface">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Tanggal Rilis</p>
                        <p className="font-bold text-on-surface">{project.year}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Status Proyek</p>
                        <p className="font-bold text-on-surface">{project.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-outline/10" />

                {/* Tech Stack Pills */}
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Teknologi</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-surface-variant text-[11px] font-black uppercase tracking-wider text-on-surface hover:bg-primary hover:text-white transition-colors cursor-default">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Fitur Utama */}
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Fitur Inti</h4>
                  <ul className="space-y-4">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-on-surface-variant">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
