"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/ui/safe-image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronDown, LayoutGrid, Globe, ReceiptText, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface PortfolioProps {
  projects: any[];
  categories: { id: number; name: string; slug: string }[];
}

export default function Portfolio({ projects, categories }: PortfolioProps) {
  const displayProjects = (projects && projects.length > 0) ? projects : PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const ITEMS_PER_LOAD = 3;
  const [visibleCount, setVisibleCount] = useState(6);

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "website": return Globe;
      case "aplikasi kasir": return ReceiptText;
      case "sistem informasi": return Database;
      case "mobile app": return LayoutGrid;
      default: return LayoutGrid;
    }
  };

  const filterOptions = useMemo(() => {
    const options = [
      { id: "Semua", label: "Semua", icon: LayoutGrid },
      ...categories.map(cat => ({
        id: cat.name,
        label: cat.name,
        icon: getIcon(cat.name)
      }))
    ];
    return options;
  }, [categories]);

  const filteredProjects = useMemo(() => {
    return displayProjects.filter(project => {
      const projectCategory = project.category?.name || project.category;
      return selectedCategory === "Semua" ? true : projectCategory === selectedCategory;
    });
  }, [selectedCategory, displayProjects]);

  const visibleProjects = useMemo(() => filteredProjects.slice(0, visibleCount), [filteredProjects, visibleCount]);
  const hasMore = visibleCount < filteredProjects.length;

  const getCount = (categoryName: string) => {
    if (categoryName === "Semua") return displayProjects.length;
    return displayProjects.filter(p => {
      const pCat = p.category?.name || p.category;
      return pCat === categoryName;
    }).length;
  };

  // Reset visible count when category changes to show initial set
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  return (
    <section id="portofolio" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex flex-col items-center text-center mb-16">
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-on-surface-variant/80 text-lg md:text-xl max-w-xl leading-relaxed font-medium mb-12 tracking-tight"
        >
          Kompilasi solusi digital dengan <span className="text-on-surface">presisi teknologi tinggi.</span>
        </motion.p>

        {/* Filter Categories - Premium Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center p-2 bg-surface-variant/40 backdrop-blur-xl rounded-[28px] border border-outline/10 gap-2"
        >
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = selectedCategory === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(opt.id)}
                className={cn(
                  "relative px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-500 flex items-center gap-3 z-10",
                  isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
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

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 min-h-[600px]">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
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
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-5 left-5">
                      <Badge className="bg-white/90 backdrop-blur-md text-primary text-[9px] font-bold uppercase tracking-widest border-none px-3.5 py-1.5 rounded-full shadow-md">
                        {project.category?.name || project.category}
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
            onClick={() => setVisibleCount(prev => Math.min(prev + ITEMS_PER_LOAD, filteredProjects.length))}
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
