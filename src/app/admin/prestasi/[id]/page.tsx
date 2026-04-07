"use client";

import React, { use, useState } from "react";
import { 
  ArrowLeft, 
  Edit3, 
  Calendar, 
  Trophy, 
  Globe, 
  MapPin, 
  Layout,
  ExternalLink,
  ShieldCheck,
  Award,
  Star,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAchievement, useUpdateAchievement } from "@/hooks/use-achievements";
import { useAchievementCategories } from "@/hooks/use-achievement-categories";
import SafeImage from "@/components/ui/safe-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AdminFormModal } from "@/components/admin/modals/AdminFormModal";
import { AchievementForm } from "@/components/admin/forms/AchievementForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: achievement, isLoading, error } = useAchievement(id);
  const { data: categories = [] } = useAchievementCategories();
  const updateMutation = useUpdateAchievement();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-primary rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Menghubungkan Database...</p>
      </div>
    );
  }

  if (error || !achievement) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-red-500 font-bold">Gagal memuat data prestasi.</p>
        <Link href="/admin/prestasi">
          <Button variant="outline">Kembali ke Daftar</Button>
        </Link>
      </div>
    );
  }

  const handleUpdateSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync({ id: achievement.id, data });
      setIsEditModalOpen(false);
    } catch (err) {
      // Toast handles error
    }
  };

  const getScopeIcon = (scope: string) => {
    return scope.toLowerCase() === "nasional" ? <Globe className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />;
  };

  const currentCategoryName = achievement.category?.name || "Tanpa Kategori";

  return (
    <div className="space-y-8 pb-20">
      <AdminFormModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Update Prestasi"
        description="Lakukan perubahan pada data prestasi melalui wizard kontrol presisi kami."
        badge="Editor Prestasi"
      >
        <AchievementForm
          initialData={achievement}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          loading={updateMutation.isPending}
          categories={categories}
        />
      </AdminFormModal>

      {/* Header / Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/prestasi">
            <button className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:shadow-md transition-all active:scale-95">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-600 border-blue-100 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5">
                {currentCategoryName}
              </Badge>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] border-l border-slate-200 pl-2">ID: #{achievement.id}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{achievement.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsEditModalOpen(true)}
            className="h-11 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] gap-2.5 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Edit3 className="w-4 h-4 stroke-[2.5]" /> Edit Prestasi
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
            <div className="relative aspect-video overflow-hidden">
              <SafeImage 
                src={achievement.image} 
                alt={achievement.title} 
                fill 
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
              
              {/* Floating Badge */}
              <div className="absolute top-6 left-6">
                <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" /> {achievement.year}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Narrative Content */}
          <div className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <section className="space-y-4 relative">
              <div className="flex items-center gap-3 text-primary">
                <Trophy className="w-5 h-5" />
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">Detail Pencapaian</h2>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed font-bold tracking-tight">
                {achievement.description}
              </p>
            </section>

            {/* Sub-narrative or extra info if available */}
            <div className="p-6 rounded-[24px] bg-slate-50/50 border border-slate-100 group">
              <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                Prestasi ini merupakan bentuk komitmen 35UTech dalam menghadirkan inovasi teknologi yang berdampak luas, baik di tingkat lokal maupun nasional.
              </p>
            </div>
          </div>

          {/* Slider Gallery Section */}
          {(achievement.gallery && achievement.gallery.length > 0) && (
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
                    {achievement.gallery.length} Screens / Photos
                  </Badge>
                </div>
              </div>
              
              <div className="px-12 relative">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {achievement.gallery.map((img: any, idx: number) => (
                      <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/2">
                        <motion.div 
                          whileHover={{ scale: 0.98 }}
                          className="aspect-video rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100 relative group shadow-sm"
                        >
                          <SafeImage src={img.imageUrl} alt={`${achievement.title} Slide ${idx + 1}`} fill className="object-cover" />
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
              Achievement Specs
            </h2>
            
            <div className="space-y-5 relative">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tahun</p>
                  <p className="text-sm font-black text-slate-800">{achievement.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  {getScopeIcon(achievement.scope)}
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Cakupan Wilayah</p>
                  <p className="text-sm font-black text-slate-800">{achievement.scope}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Kategori</p>
                  <p className="text-sm font-black text-slate-800">{currentCategoryName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visibility Status */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm">
             <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              System Status
            </h2>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
               <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight">Status Publikasi</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${achievement.isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <p className="text-xs font-black text-slate-700 uppercase tracking-tighter">
                      {achievement.isPublished ? 'Live on Site' : 'Draft Mode'}
                    </p>
                  </div>
               </div>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${achievement.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                 {achievement.isPublished ? <Globe className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
