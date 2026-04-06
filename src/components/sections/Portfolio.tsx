"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Portfolio() {
  const ITEMS_PER_LOAD = 3;
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProjects = useMemo(() => PORTFOLIO_DATA.slice(0, visibleCount), [visibleCount]);
  const hasMore = visibleCount < PORTFOLIO_DATA.length;

  return (
    <section id="portofolio" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-primary/10"
        >
          Etalase Portofolio
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight text-on-surface">
          Karya Digital <span className="text-primary">Inspiratif</span>
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-medium">
          Setiap proyek adalah bukti komitmen kami terhadap presisi teknologi dan keunggulan eksekusi digital.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              <Link href={`/portofolio/${project.slug}`}>
                <Card className="group relative overflow-hidden bg-white rounded-3xl border-none ring-0 p-0 gap-0 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.1)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer">
                  {/* Image */}
                  <div className={cn("relative w-full overflow-hidden", project.aspectRatio)}>
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-5 left-5">
                      <Badge className="bg-white/90 backdrop-blur-md text-primary text-[9px] font-bold uppercase tracking-widest border-none px-3.5 py-1.5 rounded-full shadow-md">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8">
                    <h4 className="text-xl font-extrabold text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-medium mb-6">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-outline/10">
                      <span className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.15em] transition-all group-hover:gap-3">
                        Lihat Detail <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <Button
            onClick={() => setVisibleCount(prev => Math.min(prev + ITEMS_PER_LOAD, PORTFOLIO_DATA.length))}
            variant="outline"
            className="group border-primary/20 hover:bg-primary hover:text-white text-primary font-bold text-sm px-12 py-7 rounded-2xl transition-all h-auto hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-3">
              Tampilkan Lebih Banyak
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </Button>
        </motion.div>
      )}
    </section>
  );
}
