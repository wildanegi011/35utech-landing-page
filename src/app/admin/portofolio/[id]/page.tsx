"use client";

import React, { use, useState } from "react";
import { 
  ArrowLeft, 
  Edit3, 
  Calendar, 
  User, 
  CheckCircle2, 
  Cpu, 
  ExternalLink,
  Target,
  Lightbulb,
  Zap,
  Layout,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProject, useUpdateProject } from "@/hooks/use-projects";
import SafeImage from "@/components/ui/safe-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AdminFormModal } from "@/components/admin/modals/AdminFormModal";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: project, isLoading, error } = useProject(id);
  const updateMutation = useUpdateProject();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-primary rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Memuat Detail Proyek...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-red-500 font-bold">Gagal memuat data proyek.</p>
        <Link href="/admin/portofolio">
          <Button variant="outline">Kembali ke Daftar</Button>
        </Link>
      </div>
    );
  }

  const handleUpdateSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync({ id: project.id, data });
      setIsEditModalOpen(false);
    } catch (err) {
      // Toast handles error
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "sistem informasi": return "bg-blue-50 text-blue-600 border-blue-100";
      case "website": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "mobile app": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <AdminFormModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Update Proyek"
        description="Lakukan perubahan pada data proyek melalui wizard kontrol presisi kami."
        badge="Editor Proyek"
      >
        <ProjectForm
          initialData={project}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          loading={updateMutation.isPending}
        />
      </AdminFormModal>

      {/* Header / Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/portofolio">
            <button className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:shadow-md transition-all active:scale-95">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`rounded-full text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 ${getCategoryColor(project.category)}`}>
                {project.category}
              </Badge>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] border-l border-slate-200 pl-2">ID: #{project.id}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{project.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="h-11 px-5 rounded-xl border-slate-200 gap-2 font-bold text-slate-600 hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4" /> Live Site
              </Button>
            </a>
          )}
          <Button 
            onClick={() => setIsEditModalOpen(true)}
            className="h-11 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] gap-2.5 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Edit3 className="w-4 h-4 stroke-[2.5]" /> Edit Proyek
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[32px] overflow-hidden border border-slate-100 bg-white shadow-xl shadow-slate-200/40 relative group"
          >
            <div className={`relative ${project.aspectRatio} overflow-hidden`}>
              <SafeImage 
                src={project.image} 
                alt={project.title} 
                fill 
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Detailed Narrative Section */}
          <div className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <section className="space-y-4 relative">
              <div className="flex items-center gap-3 text-primary">
                <Layout className="w-5 h-5" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">Pengenalan Proyek</h2>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed font-bold tracking-tight">
                {project.description}
              </p>
              <div className="prose prose-slate max-w-none prose-p:text-slate-500 prose-p:leading-relaxed text-sm">
                {project.longDescription}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {[
                { title: "Tantangan Utama", icon: Target, content: project.challenge, color: "text-amber-600", bg: "bg-amber-50" },
                { title: "Solusi Strategis", icon: Lightbulb, content: project.solution, color: "text-blue-600", bg: "bg-blue-50" },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-[24px] ${item.bg} border-2 border-transparent hover:border-white shadow-sm transition-all hover:translate-y-[-4px]`}>
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 ${item.color} shadow-sm border border-white/50`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-[11px] font-black uppercase tracking-widest mb-2 ${item.color}`}>{item.title}</h3>
                  <p className="text-[11px] font-bold text-slate-700 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Gallery Section */}
          {(project.gallery && project.gallery.length > 0) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">Visual Timeline</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full bg-white border-slate-100 text-[9px] font-black uppercase text-slate-400 px-3 py-1">
                    {project.gallery.length} Screens
                  </Badge>
                </div>
              </div>
              
              <div className="px-12 relative">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {project.gallery.map((img, idx) => (
                      <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/2">
                        <motion.div 
                          whileHover={{ scale: 0.98 }}
                          className="aspect-video rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100 relative group shadow-sm"
                        >
                          <SafeImage src={img} alt={`${project.title} Slide ${idx + 1}`} fill className="object-cover" />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="h-10 w-10 border-slate-100 shadow-lg text-slate-400 hover:text-primary hover:bg-white -left-14" />
                  <CarouselNext className="h-10 w-10 border-slate-100 shadow-lg text-slate-400 hover:text-primary hover:bg-white -right-14" />
                </Carousel>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Area */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Specs Card */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Project Context
            </h2>
            
            <div className="space-y-5 relative">
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Stakeholder</p>
                  <p className="text-sm font-black text-slate-800">{project.client}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Cycle Year</p>
                  <p className="text-sm font-black text-slate-800">{project.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Execution Phase</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs font-black text-slate-700 uppercase tracking-tighter">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 relative">
              <Cpu className="w-3.5 h-3.5" />
              Infrastructure Stack
            </h2>
            
            <div className="grid grid-cols-1 gap-2 relative">
              {project.techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all group">
                  <div className="relative w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-110 transition-transform">
                    <SafeImage src={tech.icon || ""} alt={tech.name} fill className="object-contain p-1" />
                  </div>
                  <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Light Theme Feature Highlights */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm group hover:border-blue-200 transition-all">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Benchmark Fitur
            </h2>
            
            <div className="space-y-4">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-2xl bg-blue-50/30 border border-transparent group-hover:border-blue-50 transition-all">
                  <div className="w-6 h-6 rounded-lg bg-white border border-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Quality Assurance Checked</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
