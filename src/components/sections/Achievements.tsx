"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, Trophy, Star, ShieldCheck } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/data/achievements";
import SafeImage from "@/components/ui/safe-image";

export default function Achievements() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % ACHIEVEMENTS_DATA.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + ACHIEVEMENTS_DATA.length) % ACHIEVEMENTS_DATA.length);
  };

  useEffect(() => {
    const timer = setInterval(slideNext, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="prestasi" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 text-center relative">

        {/* Header - Terpusat seperti Portfolio & Services */}
        <div className="flex flex-col items-center mb-20 px-4 md:px-0">
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
            className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-medium"
          >
            Setiap penghargaan adalah bukti nyata dari komitmen kami dalam menghadirkan solusi teknologi kelas dunia yang berdampak nyata.
          </motion.p>
        </div>

        {/* Slider Container */}
        <div className="relative h-[550px] md:h-[600px] mt-12">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 bg-on-surface rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl shadow-primary/10 border border-white/10"
            >
              {/* Image Side */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <SafeImage
                  src={ACHIEVEMENTS_DATA[current].image}
                  alt={ACHIEVEMENTS_DATA[current].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-on-surface/60 to-transparent" />
                <div className="absolute top-8 left-8">
                  <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] uppercase tracking-widest">
                    {ACHIEVEMENTS_DATA[current].category}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-10 md:p-20 flex flex-col justify-center space-y-8 bg-on-surface relative">
                
                {/* Internal Navigation Buttons */}
                <div className="absolute top-10 right-10 flex gap-3 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); slidePrev(); }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-500 shadow-xl backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); slideNext(); }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-500 shadow-xl backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="inline-flex items-center gap-4 text-primary">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {ACHIEVEMENTS_DATA[current].category === 'Award' && <Award className="w-6 h-6" />}
                    {ACHIEVEMENTS_DATA[current].category === 'Recognition' && <Star className="w-6 h-6" />}
                    {ACHIEVEMENTS_DATA[current].category === 'Certification' && <ShieldCheck className="w-6 h-6" />}
                    {ACHIEVEMENTS_DATA[current].category === 'Excellence' && <Trophy className="w-6 h-6" />}
                  </div>
                  <span className="text-3xl font-black italic opacity-20">{ACHIEVEMENTS_DATA[current].year}</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {ACHIEVEMENTS_DATA[current].title}
                </h3>

                <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  {ACHIEVEMENTS_DATA[current].description}
                </p>

                {/* Progress Dots */}
                <div className="flex gap-3 pt-8">
                  {ACHIEVEMENTS_DATA.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > current ? 1 : -1);
                        setCurrent(i);
                      }}
                      className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-12 bg-primary" : "w-2 bg-white/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
