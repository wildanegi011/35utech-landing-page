"use client";

import { motion } from "framer-motion";

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

function TechItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-[0_1px_10px_rgba(0,0,0,0.04)] shrink-0 group hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)] transition-shadow duration-300">
      <img src={icon} alt={name} className="w-7 h-7 object-contain" />
      <span className="text-sm font-bold text-on-surface whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TechStack() {
  // Duplicate the list for seamless infinite scroll
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4 tracking-tight text-on-surface">
            Teknologi yang Kami <span className="text-primary">Kuasai</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-medium max-w-xl mx-auto">
            Beragam teknologi modern yang kami gunakan untuk membangun solusi digital terbaik.
          </p>
        </motion.div>
      </div>

      {/* Row 1 - scroll left */}
      <div className="max-w-7xl mx-auto px-8 overflow-hidden mb-5">
        <div className="flex gap-5 animate-marquee">
          {items.map((tech, i) => (
            <TechItem key={`r1-${i}`} {...tech} />
          ))}
        </div>
      </div>

      {/* Row 2 - scroll right */}
      <div className="max-w-7xl mx-auto px-8 overflow-hidden">
        <div className="flex gap-5 animate-marquee-reverse">
          {[...items].reverse().map((tech, i) => (
            <TechItem key={`r2-${i}`} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
