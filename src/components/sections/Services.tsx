"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, Layout, Shield, Cpu, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_SERVICES = [
  {
    id: 1,
    title: "Rekayasa Perangkat Lunak",
    description: "Solusi enterprise dengan presisi arsitektur yang menjamin skalabilitas tanpa batas dan performa tinggi.",
    icon: "Code2",
  },
  {
    id: 2,
    title: "Desain Pengalaman",
    description: "Antarmuka intuitif dimana estetika bertemu psikologi untuk interaksi pengguna yang bermakna.",
    icon: "Layout",
  },
  {
    id: 3,
    title: "Akselerasi Bisnis",
    description: "Transformasi proses bisnis tradisional menjadi alur kerja digital yang cepat dan terintegrasi.",
    icon: "Zap",
  }
];

const TECH_STACK = [
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

const IconMap = {
  Code2: Code2,
  Layout: Layout,
  Shield: Shield,
  Cpu: Cpu,
  Zap: Zap,
  BarChart3: BarChart3,
};

function TechItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-surface-variant/50 shrink-0 hover:bg-primary/5 transition-colors duration-300">
      <img src={icon} alt={name} className="w-6 h-6 object-contain" />
      <span className="text-sm font-bold text-on-surface whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function Services() {
  const { data: services = MOCK_SERVICES } = useQuery({
    queryKey: ["services"],
    queryFn: async () => MOCK_SERVICES,
  });

  const techItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section id="layanan" className="max-w-7xl mx-auto px-8 py-32">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-primary/10"
        >
          Keahlian Strategis
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-[1.1] tracking-tight text-on-surface">
          Solusi Teknologi <span className="text-primary">Tanpa Batas</span>
        </h2>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed font-medium">
          Kami memadukan visi masa depan dan keahlian teknis untuk mengakselerasi transformasi digital Anda secara presisi.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, idx) => {
          const Icon = IconMap[service.icon as keyof typeof IconMap] || Code2;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="group relative h-full rounded-3xl overflow-hidden border-none ring-0 p-0 gap-0 bg-white transition-all duration-500 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.1)] hover:-translate-y-1.5">
                {/* Background Watermark Icon */}
                <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.06] pointer-events-none transition-transform duration-700 group-hover:scale-110">
                  <Icon className="w-56 h-56 text-on-surface" />
                </div>

                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <CardHeader className="relative z-10 p-8 pb-0">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    "bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-white"
                  )}>
                    <Icon className="w-7 h-7 transition-colors duration-500" />
                  </div>
                  <CardTitle className="text-xl font-extrabold text-on-surface mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 p-8 pt-0 flex flex-col h-full">
                  <p className="text-on-surface-variant text-base leading-relaxed mb-8 font-medium">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-outline/10">
                    <button className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.2em] transition-all hover:gap-5">
                      Pelajari <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tech Stack Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-center text-on-surface-variant text-sm font-bold uppercase tracking-[0.2em] mb-8">
          Teknologi yang Kami Kuasai
        </p>
        <div className="overflow-hidden mb-4">
          <div className="flex gap-4 animate-marquee">
            {techItems.map((tech, i) => (
              <TechItem key={`r1-${i}`} {...tech} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-reverse">
            {[...techItems].reverse().map((tech, i) => (
              <TechItem key={`r2-${i}`} {...tech} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
