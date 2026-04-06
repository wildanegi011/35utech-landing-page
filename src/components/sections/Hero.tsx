"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    title: "Masa Depan Eksistensi Digital.",
    subtitle: "Merancang",
    description: "Kami tidak hanya membangun perangkat lunak; kami merekayasa ekosistem digital yang tangguh dengan presisi arsitektural masa depan."
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=2070",
    title: "Keamanan Tanpa Kompromi.",
    subtitle: "Mengamankan",
    description: "Infrastruktur keamanan siber kelas dunia untuk melindungi aset digital Anda dari ancaman global yang terus berkembang."
  },
  {
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=2070",
    title: "Inovasi Tanpa Batas.",
    subtitle: "Mendorong",
    description: "Platform AI dan analitik tercanggih untuk mempercepat pertumbuhan bisnis Anda melalui wawasan berbasis data yang akurat."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="beranda" className="relative h-svh flex items-center overflow-hidden bg-on-surface">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <SafeImage
              src={SLIDES[currentSlide].image}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            {/* Immersive Overlays */}
            <div className="absolute inset-0 bg-on-surface/50 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-linear-to-t from-on-surface via-on-surface/30 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-on-surface/80 via-on-surface/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-10">
        <div className="max-w-4xl">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.span
              className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 block w-fit border border-white/20"
            >
              Mitra Teknologi Strategis
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-10 leading-[1.05] text-white drop-shadow-2xl">
              {SLIDES[currentSlide].subtitle} <br />
              <span className="text-primary">{SLIDES[currentSlide].title}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-14 leading-relaxed font-medium">
              {SLIDES[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold text-sm px-10 py-7 rounded-2xl transition-all h-auto shadow-2xl shadow-primary/20">
                Jelajahi Keahlian Kami
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white font-bold text-sm px-10 py-7 rounded-2xl transition-all h-auto backdrop-blur-md">
                Lihat Portofolio
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Center Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group relative transition-all duration-300"
          >
            <div className={`h-1 transition-all duration-700 rounded-full ${currentSlide === idx ? "w-14 bg-primary" : "w-6 bg-white/30 group-hover:bg-white/60"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
